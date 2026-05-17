import mongoose from "mongoose";

// create one connection across next hot reloads
let cached = global.mongoose || { conn: null, promise: null };

export async function connectDB() {
  // if connection from session exists reuse it
  if (cached.conn) return cached.conn;

  cached.promise = mongoose.connect(process.env.MONGODB_URI);
  cached.conn = await cached.promise;
  return cached.conn;
}