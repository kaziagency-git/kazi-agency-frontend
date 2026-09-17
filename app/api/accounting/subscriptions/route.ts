import { collectionHandlers } from '@/lib/accounting/crud';
import { subscriptionsResource } from '@/lib/server/services/accounting/resources';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const handlers = collectionHandlers(subscriptionsResource);

export const GET = handlers.GET;
export const POST = handlers.POST;
