import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose | null> | null;
}

declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: MongooseCache | undefined;
}

let cached: MongooseCache = global.mongooseCache || { conn: null, promise: null };

if (!global.mongooseCache) {
  global.mongooseCache = cached;
}

// Timeout helper to guarantee fail-fast on serverless functions
function timeoutPromise<T>(promise: Promise<T>, ms: number, fallbackValue: T): Promise<T> {
  return new Promise((resolve) => {
    const timer = setTimeout(() => {
      console.warn(`⏳ MongoDB connection timed out after ${ms}ms. Using fast fallback.`);
      resolve(fallbackValue);
    }, ms);

    promise
      .then((res) => {
        clearTimeout(timer);
        resolve(res);
      })
      .catch((err) => {
        clearTimeout(timer);
        console.error('❌ MongoDB connection error:', err.message);
        resolve(fallbackValue);
      });
  });
}

export async function connectToDatabase(): Promise<typeof mongoose | null> {
  if (!MONGODB_URI) {
    return null;
  }

  if (cached.conn && mongoose.connection.readyState === 1) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      maxPoolSize: 10,
      connectTimeoutMS: 3000,
      serverSelectionTimeoutMS: 3000, // 3 seconds max
      socketTimeoutMS: 4000,
    };

    const rawConnect = mongoose.connect(MONGODB_URI, opts).then((inst) => {
      console.log('✅ Connected to MongoDB Atlas successfully.');
      return inst;
    });

    cached.promise = timeoutPromise<typeof mongoose | null>(rawConnect, 3500, null);
  }

  cached.conn = await cached.promise;
  if (!cached.conn) {
    cached.promise = null; // reset cache on failure so next request can retry
  }
  return cached.conn;
}
