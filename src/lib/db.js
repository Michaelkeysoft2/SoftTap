import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectToDatabase() {
  // If explicitly flagged to use local file DB, return mock connection immediately
  if (global.isLocalDb) {
    return { isLocal: true };
  }

  // If no MONGODB_URI is provided and local mongodb is not running, fail fast to local DB
  if (!MONGODB_URI) {
    // Attempt local MongoDB with a short timeout
    try {
      if (cached.conn && mongoose.connection.readyState === 1) {
        return cached.conn;
      }

      if (!cached.promise) {
        cached.promise = mongoose.connect('mongodb://127.0.0.1:27017/softtap', {
          serverSelectionTimeoutMS: 1500, // 1.5s fast timeout if not installed
          bufferCommands: false,
        });
      }

      cached.conn = await cached.promise;
      global.isLocalDb = false;
      return cached.conn;
    } catch (err) {
      console.log('[SoftTap Database] MongoDB not running locally. Using persistent file storage (data/db.json).');
      cached.promise = null;
      cached.conn = null;
      global.isLocalDb = true;
      return { isLocal: true };
    }
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
