import { collectionHandlers } from '@/lib/accounting/crud';
import { accountsResource } from '@/lib/server/services/accounting/resources';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const handlers = collectionHandlers(accountsResource);

export const GET = handlers.GET;
export const POST = handlers.POST;
