import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import mongoose from 'mongoose';

export async function GET() {
  try {
    await connectDB();

    // Access the collection directly — no model needed for this test
    const db = mongoose.connection.db;
    const movies = await db
      .collection('movies')
      .find({})
      .limit(3)
      .toArray();

    return NextResponse.json({ success: true, count: movies.length, movies });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}