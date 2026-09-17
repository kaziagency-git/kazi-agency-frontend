import { collectionHandlers } from '@/lib/accounting/crud';
import { domainsResource } from '@/lib/server/services/accounting/resources';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const handlers = collectionHandlers(domainsResource);

export const GET = handlers.GET;
export const POST = handlers.POST;
