import { collectionHandlers } from '@/lib/accounting/crud';
import { clientProfilesResource } from '@/lib/server/services/accounting/resources';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const handlers = collectionHandlers(clientProfilesResource);

export const GET = handlers.GET;
export const POST = handlers.POST;
