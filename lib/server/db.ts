import mongoose from 'mongoose';

const DB_NAME = 'kazi-agency';

// Hard ceiling on a connect attempt. Kept under Vercel's function budget so a
// stalled connection fails with a useful message instead of a bare timeout.
const CONNECT_CEILING_MS = 9000;

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  // eslint-disable-next-line no-var
  var _mongooseCache: MongooseCache | undefined;
}

// Cached on globalThis so the connection survives both serverless warm
// invocations and Next.js dev hot-reloads (each of which re-evaluates modules).
const cache: MongooseCache = global._mongooseCache ?? { conn: null, promise: null };
global._mongooseCache = cache;

export async function connectDB(): Promise<typeof mongoose> {
  if (cache.conn && mongoose.connection.readyState === 1) return cache.conn;

  // A previously resolved connection that has since dropped must be retried,
  // not awaited again — otherwise we serve requests against a dead socket.
  if (mongoose.connection.readyState === 0) cache.promise = null;

  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error('MONGODB_URI environment variable is not set');

  if (!cache.promise) {
    // serverSelectionTimeoutMS does NOT cover the DNS SRV lookup that a
    // mongodb+srv:// URI performs first, so a stalled resolver can hang for
    // a minute or more. Race the whole attempt against a hard ceiling.
    cache.promise = Promise.race([
      mongoose.connect(uri, {
        dbName: DB_NAME,
        // Serverless: never queue a query against a missing connection.
        bufferCommands: false,
        serverSelectionTimeoutMS: 8000,
        connectTimeoutMS: 8000,
        maxPoolSize: 10,
      }),
      new Promise<never>((_, reject) => {
        const timer = setTimeout(
          () =>
            reject(
              new Error(
                'Timed out connecting to MongoDB. Check MONGODB_URI and Atlas Network Access.'
              )
            ),
          CONNECT_CEILING_MS
        );
        timer.unref?.();
      }),
    ]).catch((err) => {
      cache.promise = null;
      throw err;
    });
  }

  cache.conn = await cache.promise;
  return cache.conn;
}
