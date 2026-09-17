import { collectionHandlers } from '@/lib/accounting/crud';
import { invoicesResource } from '@/lib/server/services/accounting/resources';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const handlers = collectionHandlers(invoicesResource);

export const GET = handlers.GET;
export const POST = handlers.POST;
