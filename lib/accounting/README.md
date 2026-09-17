# Accounting module

Admin-only bookkeeping for Kazi Agency: transactions, invoices, client billing,
domains, hosting, subscriptions and the reports built on top of them.

The module is self-contained. It reuses the app's existing Mongoose connection
(`lib/server/db.ts`), admin auth (`lib/server/auth.ts`) and UI kit, and adds no
npm dependencies. No existing collection is read from or written to except
`clients`, which is only ever **read** through `clientId` references.

---

## Conventions

| Topic | Rule |
| --- | --- |
| Currency | USD only. Every amount is an **integer number of cents** (`4999` = `$49.99`). Floats are rejected by the schema validators. |
| Dates | Stored in **UTC**. Displayed and bucketed in **`America/New_York`** (`ACC_DISPLAY_TIMEZONE` in `constants.ts` — the single place to change it). |
| Collections | All prefixed `acc_`. |
| Auth | Admin endpoints use the existing `Authorization: Bearer <admin JWT>`. Integration endpoints use `x-api-key`. |

### Response envelope

Every endpoint in this module answers with:

```jsonc
{ "success": true,  "data": { /* payload */ }, "error": null }
{ "success": false, "data": null,              "error": "Message" }
```

> This differs from the `{ success, message, data }` shape used by `/api/v1/*`.
> Accounting routes therefore use `accRoute()` (`lib/accounting/api-route.ts`)
> instead of the shared `route()` wrapper. Both call the same `connectDB()`.

### Date filters

`from` / `to` accept either a full ISO timestamp or a bare `YYYY-MM-DD`. A bare
date is read as a **New York** day — `to=2026-03-31` includes everything up to
23:59:59.999 New York time, not UTC.

---

## Admin endpoints

All require `Authorization: Bearer <admin access token>` and return `403` for a
client-portal token, `401` for a missing or expired one.

### Resources

| Resource | Path | Soft delete on `DELETE` |
| --- | --- | --- |
| Client billing profiles | `/api/accounting/client-profiles` | `isActive = false` |
| Payment accounts | `/api/accounting/accounts` | `isActive = false` |
| Categories | `/api/accounting/categories` | `isActive = false` |
| Transactions | `/api/accounting/transactions` | `isArchived = true` |
| Invoices | `/api/accounting/invoices` | `status = "void"` |
| Time logs | `/api/accounting/time-logs` | **hard delete** (no archive field) |
| Domains | `/api/accounting/domains` | `isArchived = true` |
| Hostings | `/api/accounting/hostings` | `isArchived = true` |
| Subscriptions | `/api/accounting/subscriptions` | `isArchived = true` |

Each resource exposes:

```
GET    /api/accounting/<resource>        list (paginated, sortable, filterable)
POST   /api/accounting/<resource>        create
GET    /api/accounting/<resource>/:id    read one
PUT    /api/accounting/<resource>/:id    update (partial body accepted)
PATCH  /api/accounting/<resource>/:id    same handler as PUT
DELETE /api/accounting/<resource>/:id    soft delete per the table above
```

### List parameters

| Param | Default | Notes |
| --- | --- | --- |
| `page` | `1` | |
| `limit` | `20` | max `200` |
| `sortBy` | per resource | whitelisted; an unknown field falls back to the default |
| `sortDir` | `desc` | `asc` \| `desc` |
| `from`, `to` | — | filters the resource's date field (see below) |
| `search` | — | case-insensitive; the term is regex-escaped |
| `includeArchived` | `false` | show `isArchived: true` rows |
| `includeInactive` | `false` | show `isActive: false` rows |

Date field per resource: transactions/time-logs `date`, invoices `issueDate`,
domains/hostings `expiryDate`, subscriptions `nextBillingDate`, everything else
`createdAt`.

Filters accepted (whitelisted per resource — anything else is ignored):

- **ObjectId**: `clientId`, `categoryId`, `accountId`, `invoiceId`,
  `subscriptionId`. Pass `null` to select unlinked rows
  (e.g. `?clientId=null` = the agency's own domains).
- **Enum**: `type`, `status`, `source`, `billingType`, `billingCycle`,
  `registrar`, `provider`. Comma-separate for an OR: `?status=sent,overdue`.
- **Boolean**: `isActive`, `isArchived`, `invoiced`, `autoRenew`,
  `isBillableToClient`.

#### Examples

```bash
# March 2026 expenses over a category, newest first
curl -H "Authorization: Bearer $ADMIN_TOKEN" \
  "$BASE/api/accounting/transactions?type=out&categoryId=6612...&from=2026-03-01&to=2026-03-31"

# Unpaid invoices for one client
curl -H "Authorization: Bearer $ADMIN_TOKEN" \
  "$BASE/api/accounting/invoices?status=sent,overdue&clientId=660f...&sortBy=dueDate&sortDir=asc"

# Create an expense ($49.99 → 4999 cents)
curl -X POST -H "Authorization: Bearer $ADMIN_TOKEN" -H "Content-Type: application/json" \
  "$BASE/api/accounting/transactions" \
  -d '{"date":"2026-03-14","type":"out","amountCents":4999,"categoryId":"6612...","vendor":"Figma","description":"Design seat"}'

# Archive it
curl -X DELETE -H "Authorization: Bearer $ADMIN_TOKEN" \
  "$BASE/api/accounting/transactions/6613..."
```

List response:

```jsonc
{
  "success": true,
  "data": { "items": [...], "total": 128, "page": 1, "limit": 20, "totalPages": 7 },
  "error": null
}
```

### Seed

```bash
curl -X POST -H "Authorization: Bearer $ADMIN_TOKEN" "$BASE/api/accounting/seed"
# → { "created": ["expense:Salary", ...], "existing": [] }
```

Upsert-only and idempotent: it never overwrites a category you renamed or
recoloured, and never deletes one.

---

## Report endpoints

Admin auth. All money in cents.

### `GET /api/accounting/reports/summary?from=&to=`

Totals plus a breakdown by category and by client. Both bounds are optional.

```bash
curl -H "Authorization: Bearer $ADMIN_TOKEN" \
  "$BASE/api/accounting/reports/summary?from=2026-01-01&to=2026-03-31"
```

```jsonc
{
  "totalIncomeCents": 1250000,
  "totalExpenseCents": 480000,
  "netProfitCents": 770000,
  "transactionCount": 64,
  "byCategory": [{ "categoryId": "...", "name": "Client Payment", "type": "income", "color": "#10b981", "totalCents": 1250000, "count": 22 }],
  "byClient":   [{ "clientId": "...", "name": "Acme", "company": "Acme LLC", "incomeCents": 450000, "expenseCents": 12000, "netCents": 438000, "count": 9 }]
}
```

### `GET /api/accounting/reports/monthly?year=2026`

Always 12 rows, zero-filled, bucketed in New York time so a late-evening
payment on the 31st stays in its own month.

```jsonc
{
  "year": 2026,
  "timezone": "America/New_York",
  "months": [{ "month": 1, "label": "Jan", "incomeCents": 420000, "expenseCents": 160000, "netCents": 260000 }],
  "totalIncomeCents": 1250000, "totalExpenseCents": 480000, "netProfitCents": 770000
}
```

### `GET /api/accounting/reports/upcoming?days=30`

Domains, hostings and subscriptions renewing inside the window, plus every
overdue invoice (regardless of the window).

```jsonc
{
  "days": 30,
  "until": "2026-04-13T…Z",
  "domains":       [{ "_id": "...", "label": "acme.com", "clientName": "Acme", "date": "…", "daysRemaining": 12, "costCents": 1299, "chargeCents": 2500, "autoRenew": true }],
  "hostings":      [ … ],
  "subscriptions": [ … ],
  "overdueInvoices": [{ "_id": "...", "invoiceNumber": "INV-1043", "amountCents": 150000, "daysOverdue": 6, "status": "overdue" }]
}
```

### `GET /api/accounting/reports/subscriptions-total`

Active subscriptions only. A yearly plan's monthly equivalent is `cost / 12`
rounded to the cent; `one_time` purchases are excluded from both recurring
totals and reported separately.

```jsonc
{
  "monthlyEquivalentCents": 48750,
  "yearlyTotalCents": 585000,
  "byCycle": [{ "billingCycle": "monthly", "totalCents": 32000, "count": 7, "monthlyEquivalentCents": 32000 }],
  "billableToClientsCents": 12000,
  "agencyOwnCents": 36750,
  "oneTimeTotalCents": 9900,
  "activeCount": 11
}
```

---

## Integration endpoints (n8n)

**No session auth.** Every request must carry:

```
x-api-key: <ACCOUNTING_API_KEY>
```

compared against the env var with a SHA-256 + `crypto.timingSafeEqual` check.
Anything else returns `401`. Set the value in `.env.local` and in the hosting
environment; `.env.example` documents the variable.

### `POST /api/accounting/integrations/ghl-payment`

Records a GoHighLevel payment. **Idempotent on `ghlPaymentId`** — the unique
partial index on `acc_transactions.externalId` guarantees it, even for two
retries arriving at once.

```bash
curl -X POST -H "x-api-key: $ACCOUNTING_API_KEY" -H "Content-Type: application/json" \
  "$BASE/api/accounting/integrations/ghl-payment" \
  -d '{
    "ghlPaymentId": "pay_9f2",
    "ghlInvoiceId": "inv_77",
    "ghlContactId": "cont_12",
    "amount": 1500.00,
    "paidAt": "2026-03-14T18:22:00Z",
    "invoiceNumber": "INV-1043",
    "title": "March retainer"
  }'
```

`amount` is in **dollars** and converted to cents server-side.

| Case | Response |
| --- | --- |
| First delivery | `200` `{ "status": "processed", "transactionId", "invoiceId", "clientId", "clientMatched": true }` |
| Retry | `200` `{ "status": "already_processed", … }` |
| Contact not matched | `200` `{ "status": "processed", "clientId": null, "clientMatched": false, "warning": "No client profile matches ghlContactId …" }` |

The client is resolved via `acc_client_profiles.ghlContactId` — the existing
`Client` model is not modified. When no client matches, the transaction is
still recorded with `clientId: null` and flagged; **no invoice row is created**
in that case, because `acc_invoices.clientId` is required. Reconcile by adding
the `ghlContactId` to the client's billing profile and re-linking the
transaction from the UI.

The `Client Payment` income category is created on demand if it is missing, so
the webhook cannot fail because a category was renamed.

### `POST /api/accounting/integrations/ghl-invoice`

Upserts an invoice's status by `ghlInvoiceId`.

```bash
curl -X POST -H "x-api-key: $ACCOUNTING_API_KEY" -H "Content-Type: application/json" \
  "$BASE/api/accounting/integrations/ghl-invoice" \
  -d '{"ghlInvoiceId":"inv_77","status":"sent","ghlContactId":"cont_12","invoiceNumber":"INV-1043","amount":1500,"issueDate":"2026-03-01","dueDate":"2026-03-15"}'
```

- Invoice exists → `200` `{ "status": "updated", … }`
- Invoice is new → `201` `{ "status": "created", … }`, but only if a client can
  be resolved (`clientId` or a matching `ghlContactId`) **and** `amount` is
  present. Otherwise `404` / `400` with an explanatory `error`.

### `GET /api/accounting/integrations/due-alerts?channel=telegram`

Alerts that should be sent now and are not yet in `acc_notification_logs`.

- Domains/hostings: the most urgent threshold crossed out of **30 / 15 / 7**
  days (20 days left → the 30-day alert; 5 days left → the 7-day alert).
- Subscriptions: `nextBillingDate` within **5** days.
- Invoices: `sent` or `overdue` and past `dueDate`.

```jsonc
{
  "channel": "telegram",
  "count": 2,
  "alerts": [{
    "type": "domain_expiry_7@2026-03-21",
    "baseType": "domain_expiry_7",
    "refCollection": "acc_domains",
    "refId": "6613…",
    "channel": "telegram",
    "label": "acme.com",
    "clientName": "Acme",
    "date": "2026-03-21T00:00:00.000Z",
    "daysRemaining": 5,
    "amountCents": 1299
  }]
}
```

> **`type` carries the cycle date** (`…@2026-03-21`). Domains renew yearly and
> subscriptions monthly, so a bare `domain_expiry_7` would be logged once and
> then suppress that record's alert forever. Post the `type` value back
> **verbatim** to `notification-log`. Use `baseType` for message wording.

### `POST /api/accounting/integrations/notification-log`

Records a delivered alert. Idempotent on `(type, refId, channel)`.

```bash
curl -X POST -H "x-api-key: $ACCOUNTING_API_KEY" -H "Content-Type: application/json" \
  "$BASE/api/accounting/integrations/notification-log" \
  -d '{"type":"domain_expiry_7@2026-03-21","refCollection":"acc_domains","refId":"6613…","channel":"telegram"}'
# → 201 { "status": "logged", "logId": "…" }   |   200 { "status": "already_logged", … }
```

### `POST /api/accounting/integrations/mark-overdue`

Flips `sent` invoices past their due date to `overdue` and returns them. The
matching ids are selected first and the update is scoped to exactly those rows.

```bash
curl -X POST -H "x-api-key: $ACCOUNTING_API_KEY" "$BASE/api/accounting/integrations/mark-overdue"
# → { "updated": 3, "invoices": [{ "_id", "invoiceNumber", "clientId", "amountCents", "dueDate", "daysOverdue" }] }
```

### `POST /api/accounting/integrations/expense`

Creates an expense from a Telegram message. `amount` is in dollars; `category`
is matched **case-insensitively** against expense categories.

```bash
curl -X POST -H "x-api-key: $ACCOUNTING_API_KEY" -H "Content-Type: application/json" \
  "$BASE/api/accounting/integrations/expense" \
  -d '{"amount":"49.99","category":"software","vendor":"Figma","description":"Design seat","date":"2026-03-14"}'
# → 201 { "transactionId", "categoryId", "categoryName": "Software", "amountCents": 4999 }
```

An unknown category returns `400` listing the valid names, rather than creating
one — so a typo in Telegram cannot litter the category list.

### `PATCH /api/accounting/integrations/domain-verify`

Updates a domain's `expiryDate` and stamps `lastVerifiedAt`. Identify the
domain by hostname or by id.

```bash
curl -X PATCH -H "x-api-key: $ACCOUNTING_API_KEY" -H "Content-Type: application/json" \
  "$BASE/api/accounting/integrations/domain-verify" \
  -d '{"domain":"acme.com","expiryDate":"2027-05-14","status":"active"}'
# → { "_id", "domain", "expiryDate", "lastVerifiedAt", "status", "daysRemaining" }
```

---

## Suggested n8n schedule

| Workflow | Cadence | Calls |
| --- | --- | --- |
| Overdue sweep | daily, early | `mark-overdue` |
| Alert dispatch | daily, after the sweep | `due-alerts` → send → `notification-log` per item |
| Domain refresh | weekly | Namecheap lookup → `domain-verify` |
| Payment sync | on GHL webhook | `ghl-payment` |
| Invoice status | on GHL webhook | `ghl-invoice` |

---

## Module layout

```
lib/accounting/
  constants.ts      enums, thresholds, timezone, seed defaults   (shared with UI)
  money.ts          toCents / fromCents / formatUSD              (shared with UI)
  date.ts           New-York-aware boundaries and formatting     (shared with UI)
  api-response.ts   { success, data, error } envelope
  api-route.ts      accRoute() — connectDB + error mapping
  api-key.ts        requireApiKey() — timing-safe x-api-key
  crud.ts           generic list/create/read/update/soft-delete
  README.md

lib/server/models/accounting/      10 Mongoose models (acc_*)
lib/server/schemas/accounting/     Zod input schemas
lib/server/services/accounting/    resources.ts, report.service.ts,
                                   integration.service.ts, seed.service.ts
app/api/accounting/                route handlers only — no logic
```
