import mongoose from 'mongoose';
import dns from 'dns';

// Ensure Node can resolve MongoDB Atlas SRV records if local DNS fails
try {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch {
  // ignore if not supported in environment
}

// Fail fast, don't buffer commands if MongoDB is offline
mongoose.set('bufferCommands', false);

const MONGODB_URI = process.env.MONGODB_URI;

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectToDatabase() {
  // Ensure Node DNS resolvers are set before connecting to Atlas SRV
  try {
    dns.setServers(['8.8.8.8', '1.1.1.1']);
  } catch {
    // ignore
  }

  // If explicitly flagged to use local file DB or no URI is provided, use local DB immediately
  if (global.isLocalDb || !MONGODB_URI) {
    global.isLocalDb = true;
    return { isLocal: true };
  }

  // If MONGODB_URI is provided in environment (e.g. Atlas)
  if (cached.conn && mongoose.connection.readyState === 1) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
      bufferCommands: false,
    });
  }

  try {
    cached.conn = await cached.promise;
    global.isLocalDb = false;
    return cached.conn;
  } catch (e) {
    console.warn('[SoftTap Database] Could not connect to remote MongoDB URI. Falling back to local file storage.', e.message);
    cached.promise = null;
    cached.conn = null;
    global.isLocalDb = true;
    return { isLocal: true };
  }
}
