import mongoose, { type ConnectOptions } from 'mongoose';

const DB_NAME = 'kazi-agency';

// Hard ceiling on a connect attempt. Kept under Vercel's function budget so a
// stalled connection fails with a useful message instead of a bare timeout.
// A cold `next dev` start competes with route compilation and routinely needs
// longer than that, where no function budget applies.
const CONNECT_CEILING_MS = process.env.NODE_ENV === 'production' ? 9000 : 20000;

const CONNECT_FAILED =
  'Timed out connecting to MongoDB. Check MONGODB_URI and Atlas Network Access.';

/** `mongoose.connection.readyState` values, named for legibility. */
const DISCONNECTED = 0;
const CONNECTED = 1;
const CONNECTING = 2;

const CONNECT_OPTIONS: ConnectOptions = {
  dbName: DB_NAME,
  // Serverless: never queue a query against a missing connection.
  bufferCommands: false,
  // Kept under the ceiling so the driver reports the real failure first — a
  // driver rejection resets readyState, where a ceiling has to abandon the
  // attempt by hand.
  serverSelectionTimeoutMS: CONNECT_CEILING_MS - 1000,
  connectTimeoutMS: CONNECT_CEILING_MS - 1000,
  maxPoolSize: 10,
};

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
  /** Set while a stalled attempt is being torn down, so it happens once. */
  abandoning: boolean;
}

declare global {
  // eslint-disable-next-line no-var
  var _mongooseCache: MongooseCache | undefined;
}

// Cached on globalThis so the connection survives both serverless warm
// invocations and Next.js dev hot-reloads (each of which re-evaluates modules).
const cache: MongooseCache = global._mongooseCache ?? {
  conn: null,
  promise: null,
  abandoning: false,
};
global._mongooseCache = cache;

export async function connectDB(): Promise<typeof mongoose> {
  if (cache.conn && mongoose.connection.readyState === CONNECTED) return cache.conn;

  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error('MONGODB_URI environment variable is not set');

  // A previously resolved connection that has since dropped must be retried,
  // not awaited again — otherwise we serve requests against a dead socket.
  if (mongoose.connection.readyState === DISCONNECTED) {
    cache.conn = null;
    cache.promise = null;
  }

  if (!cache.promise) {
    const attempt: Promise<typeof mongoose> = openConnection(uri).catch((err) => {
      // Only tear down the cache if a newer attempt has not replaced this one.
      if (cache.promise === attempt) {
        cache.conn = null;
        cache.promise = null;
      }
      throw err;
    });
    cache.promise = attempt;
  }

  cache.conn = await cache.promise;
  return cache.conn;
}

async function openConnection(uri: string): Promise<typeof mongoose> {
  // `mongoose.connect()` returns immediately when an attempt for the same URI
  // is already in flight (`openUri` short-circuits on a `connecting` state), so
  // calling it again would resolve against a connection that is not open yet
  // and every query would throw "before initial connection is complete" under
  // `bufferCommands: false`. Once the ceiling below has fired, the abandoned
  // attempt is exactly that case, so join the running attempt through the
  // connection's events rather than asking mongoose to connect a second time.
  const joined = mongoose.connection.readyState === DISCONNECTED ? null : attemptSettled();
  const attempt = joined
    ? joined.promise
    : mongoose.connect(uri, CONNECT_OPTIONS).then(() => undefined);
  const deadline = ceiling();

  try {
    // serverSelectionTimeoutMS does NOT cover the DNS SRV lookup that a
    // mongodb+srv:// URI performs first, so a stalled resolver can hang for
    // a minute or more. Race the whole attempt against a hard ceiling.
    await Promise.race([attempt, deadline.promise]);
  } catch (err) {
    // The ceiling firing leaves a join waiting on events that may never come,
    // so drop its listeners instead of leaking a set per failed request.
    joined?.cancel();
    abandonStalledAttempt();
    throw err;
  } finally {
    deadline.clear();
  }

  // Joining an attempt that then failed lands here with the connection shut.
  // Callers query straight off the returned instance, so it has to be open.
  if (mongoose.connection.readyState !== CONNECTED) throw new Error(CONNECT_FAILED);

  return mongoose;
}

/** Resolves once the attempt already in flight has either opened or failed. */
function attemptSettled(): { promise: Promise<void>; cancel: () => void } {
  const conn = mongoose.connection;
  let cancel = () => {};

  const promise = new Promise<void>((resolve) => {
    const settle = () => {
      conn.off('connected', settle);
      conn.off('error', settle);
      conn.off('close', settle);
      resolve();
    };
    cancel = settle;

    conn.on('connected', settle);
    conn.on('error', settle);
    conn.on('close', settle);

    // The attempt can settle between the readyState check above and these
    // listeners going on, in which case no event is ever coming.
    if (conn.readyState !== CONNECTING) settle();
  });

  return { promise, cancel };
}

function ceiling(): { promise: Promise<never>; clear: () => void } {
  let timer: ReturnType<typeof setTimeout> | undefined;

  const promise = new Promise<never>((_, reject) => {
    timer = setTimeout(() => reject(new Error(CONNECT_FAILED)), CONNECT_CEILING_MS);
    timer.unref?.();
  });

  return { promise, clear: () => clearTimeout(timer) };
}

/**
 * Give up on an attempt that blew through the ceiling.
 *
 * `close()` on a connecting connection waits for that attempt to settle before
 * it does anything, so this must not be awaited — it resolves whenever the
 * stalled attempt finally gives up, which returns readyState to 0 and lets the
 * next request start a genuinely new connection instead of joining a zombie.
 */
function abandonStalledAttempt(): void {
  if (cache.abandoning || mongoose.connection.readyState !== CONNECTING) return;

  cache.abandoning = true;
  void mongoose
    .disconnect()
    .catch(() => {})
    .finally(() => {
      cache.abandoning = false;
    });
}
