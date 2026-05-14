import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Movie from "@/models/Movie";

export async function GET() {
  try {
    await connectDB();

    const movies = await Movie.find({}).limit(3);

    return NextResponse.json({
      success: true,
      count: movies.length,
      movies,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}