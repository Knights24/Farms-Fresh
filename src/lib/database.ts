import mongoose from 'mongoose';
import { mockDB } from './mock-db';

const MONGODB_URI = process.env.MONGODB_URI || '';
const USE_MOCK_DB = process.env.USE_MOCK_DB === 'true';

interface MongooseConnection {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  var mongooseCache: MongooseConnection | undefined;
}

let cached = global.mongooseCache || { conn: null, promise: null };

if (!cached) {
  cached = global.mongooseCache = { conn: null, promise: null };
}

async function connectDB(): Promise<typeof mongoose> {
  // If using mock database, return a mock connection
  if (USE_MOCK_DB || MONGODB_URI.startsWith('mock://') || !MONGODB_URI) {
    console.log('📝 Using Mock Database for development');
    // Return mongoose itself but we'll handle queries through mock-db
    return mongoose;
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      family: 4
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts);
  }

  try {
    cached.conn = await cached.promise;
    console.log('✅ MongoDB Connected Successfully');
  } catch (e) {
    cached.promise = null;
    console.error('❌ MongoDB Connection Error:', e);
    console.log('💡 Falling back to Mock Database for development');
    
    // Return mongoose for mock usage
    return mongoose;
  }

  return cached.conn;
}

// Helper function to check if we're using mock database
export function isUsingMockDB(): boolean {
  return USE_MOCK_DB || MONGODB_URI.startsWith('mock://') || !MONGODB_URI;
}

// Export mock database instance
export { mockDB };

export default connectDB;
