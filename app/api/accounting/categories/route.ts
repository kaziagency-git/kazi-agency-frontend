import { collectionHandlers } from '@/lib/accounting/crud';
import { categoriesResource } from '@/lib/server/services/accounting/resources';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const handlers = collectionHandlers(categoriesResource);

export const GET = handlers.GET;
export const POST = handlers.POST;
