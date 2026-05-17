import { connectDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import Movie from "@/models/Movie";

export async function GET() {
  try {
    await connectDB();

    const movies = await Movie.find();

    return NextResponse.json({
      success: true,
      movies
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error.message
    },
      { status: 500 }
    );
  }
}