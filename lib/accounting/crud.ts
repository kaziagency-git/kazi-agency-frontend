import 'server-only';
import { NextResponse } from 'next/server';
import { FilterQuery, Model, SortOrder, isValidObjectId } from 'mongoose';
import { ZodTypeAny } from 'zod';
import { requireAdmin } from '@/lib/server/auth';
import { HttpError, jsonBody, searchParams } from '@/lib/server/http';
import { accOk, accFail, AccListPayload } from './api-response';
import { accRoute } from './api-route';
import { listQuerySchema } from '@/lib/server/schemas/accounting/acc-common.schema';
import { parseBoundary } from './date';

/**
 * Generic admin CRUD for the accounting collections.
 *
 * Every resource behaves the same way — paginate, sort, filter, soft-delete —
 * so the behaviour lives here once and each route file only supplies its
 * config. Filter and sort keys are whitelisted per resource; an unknown query
 * key is ignored rather than passed through to Mongo.
 */

/** How DELETE retires a record. `null` means a real delete. */
export type SoftDelete =
  | { field: 'isArchived'; value: true }
  | { field: 'isActive'; value: false }
  | { field: 'status'; value: string }
  | null;

export interface AccResourceConfig {
  /** Human name used in error messages, e.g. "Transaction". */
  label: string;
  // Mongoose's per-model generics cannot be expressed through a shared
  // helper; the Zod schemas below are what actually constrain a write.
  model: Model<Record<string, unknown>>;
  createSchema: ZodTypeAny;
  updateSchema: ZodTypeAny;
  /** Field that `from`/`to` filter on. */
  dateField: string | null;
  defaultSortBy: string;
  sortable: readonly string[];
  /** Filters whose value must be a valid ObjectId (or the literal "null"). */
  objectIdFilters?: readonly string[];
  /** Filters matched verbatim as strings (enums). */
  stringFilters?: readonly string[];
  /** Filters read as "true"/"false". */
  booleanFilters?: readonly string[];
  /** Fields a `search=` term is matched against, case-insensitively. */
  searchable?: readonly string[];
  softDelete: SoftDelete;
  populate?: readonly { path: string; select: string }[];
  /** Set false to keep soft-deleted rows visible by default. */
  hideRetiredByDefault?: boolean;
}

type ItemCtx = { params: Promise<{ id: string }> };

type ParsedListQuery = {
  from?: string;
  to?: string;
  search?: string;
  includeArchived: boolean;
  includeInactive: boolean;
};

// ── Query building ─────────────────────────────────────────────────────────

function buildFilter(
  req: Request,
  cfg: AccResourceConfig,
  q: ParsedListQuery
): FilterQuery<Record<string, unknown>> {
  const qs = searchParams(req);
  const filter: Record<string, unknown> = {};

  if (cfg.dateField && (q.from || q.to)) {
    const range: Record<string, Date> = {};
    if (q.from) range.$gte = parseBoundary(q.from, false);
    if (q.to) range.$lte = parseBoundary(q.to, true);
    filter[cfg.dateField] = range;
  }

  for (const key of cfg.objectIdFilters ?? []) {
    const raw = qs.get(key);
    if (raw === null || raw === '' || raw === 'all') continue;
    // "null" selects unlinked rows — agency-owned domains, unassigned expenses.
    if (raw === 'null') {
      filter[key] = null;
      continue;
    }
    if (!isValidObjectId(raw)) throw new HttpError(`Invalid ${key}`, 400);
    filter[key] = raw;
  }

  for (const key of cfg.stringFilters ?? []) {
    const raw = qs.get(key);
    if (raw === null || raw === '' || raw === 'all') continue;
    // Comma-separated values become an $in, e.g. status=sent,overdue
    const values = raw.split(',').map((v) => v.trim()).filter(Boolean);
    if (values.length === 0) continue;
    filter[key] = values.length > 1 ? { $in: values } : values[0];
  }

  for (const key of cfg.booleanFilters ?? []) {
    const raw = qs.get(key);
    if (raw === null || raw === '' || raw === 'all') continue;
    filter[key] = raw === 'true';
  }

  if (q.search && cfg.searchable?.length) {
    const regex = new RegExp(escapeRegex(q.search), 'i');
    filter.$or = cfg.searchable.map((field) => ({ [field]: regex }));
  }

  // Soft-deleted rows stay out of the default listing.
  if (cfg.hideRetiredByDefault !== false && cfg.softDelete) {
    const { field } = cfg.softDelete;
    if (field === 'isArchived' && !q.includeArchived && filter.isArchived === undefined) {
      filter.isArchived = { $ne: true };
    }
    if (field === 'isActive' && !q.includeInactive && filter.isActive === undefined) {
      filter.isActive = true;
    }
  }

  return filter as FilterQuery<Record<string, unknown>>;
}

/** A user-supplied search term must not be able to act as a regex. */
function escapeRegex(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function buildSort(
  cfg: AccResourceConfig,
  sortBy: string | undefined,
  sortDir: 'asc' | 'desc'
): Record<string, SortOrder> {
  const field = sortBy && cfg.sortable.includes(sortBy) ? sortBy : cfg.defaultSortBy;
  // _id breaks ties so pagination cannot show the same row on two pages.
  return { [field]: sortDir === 'asc' ? 1 : -1, _id: -1 };
}

// ── Handlers ───────────────────────────────────────────────────────────────

/** GET (list) + POST (create) for `/api/accounting/<resource>`. */
export function collectionHandlers(cfg: AccResourceConfig) {
  const GET = accRoute(async (req: Request): Promise<NextResponse> => {
    requireAdmin(req);

    const q = listQuerySchema.parse(Object.fromEntries(searchParams(req)));
    const filter = buildFilter(req, cfg, q);
    const sort = buildSort(cfg, q.sortBy, q.sortDir);
    const skip = (q.page - 1) * q.limit;

    let query = cfg.model.find(filter).sort(sort).skip(skip).limit(q.limit);
    for (const p of cfg.populate ?? []) query = query.populate(p.path, p.select);

    const [items, total] = await Promise.all([
      query.lean(),
      cfg.model.countDocuments(filter),
    ]);

    const payload: AccListPayload<unknown> = {
      items,
      total,
      page: q.page,
      limit: q.limit,
      totalPages: Math.max(1, Math.ceil(total / q.limit)),
    };
    return accOk(payload);
  });

  const POST = accRoute(async (req: Request): Promise<NextResponse> => {
    requireAdmin(req);
    const body = cfg.createSchema.parse(await jsonBody(req));
    const created = await cfg.model.create(body);
    return accOk(created.toObject(), 201);
  });

  return { GET, POST };
}

/** GET + PUT/PATCH + DELETE for `/api/accounting/<resource>/[id]`. */
export function itemHandlers(cfg: AccResourceConfig) {
  const GET = accRoute<ItemCtx>(async (req, { params }): Promise<NextResponse> => {
    requireAdmin(req);
    const { id } = await params;
    if (!isValidObjectId(id)) return accFail(`Invalid ${cfg.label} id`, 400);

    let query = cfg.model.findById(id);
    for (const p of cfg.populate ?? []) query = query.populate(p.path, p.select);

    const doc = await query.lean();
    if (!doc) return accFail(`${cfg.label} not found`, 404);
    return accOk(doc);
  });

  const update = accRoute<ItemCtx>(async (req, { params }): Promise<NextResponse> => {
    requireAdmin(req);
    const { id } = await params;
    if (!isValidObjectId(id)) return accFail(`Invalid ${cfg.label} id`, 400);

    const body = cfg.updateSchema.parse(await jsonBody(req));

    // runValidators keeps the schema-level rules (integer cents, enums)
    // enforced on updates, which Mongoose skips by default.
    const doc = await cfg.model.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
      context: 'query',
    });

    if (!doc) return accFail(`${cfg.label} not found`, 404);
    return accOk(doc.toObject());
  });

  const DELETE = accRoute<ItemCtx>(async (req, { params }): Promise<NextResponse> => {
    requireAdmin(req);
    const { id } = await params;
    if (!isValidObjectId(id)) return accFail(`Invalid ${cfg.label} id`, 400);

    if (cfg.softDelete) {
      const doc = await cfg.model.findByIdAndUpdate(
        id,
        { [cfg.softDelete.field]: cfg.softDelete.value },
        { new: true }
      );
      if (!doc) return accFail(`${cfg.label} not found`, 404);
      return accOk({ id, softDeleted: true, [cfg.softDelete.field]: cfg.softDelete.value });
    }

    const doc = await cfg.model.findByIdAndDelete(id);
    if (!doc) return accFail(`${cfg.label} not found`, 404);
    return accOk({ id, deleted: true });
  });

  return { GET, PUT: update, PATCH: update, DELETE };
}
