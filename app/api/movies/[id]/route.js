import { connectDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import Movie from "@/models/Movie";

export async function GET(request, { params }) {
  try {
    await connectDB();

    const { id } = await params;

    if (!id) {
      return NextResponse.json({
        success: false,
        message: "Could not find moive-ID"
      },
        { status: 400 }
      );
    }

    const movie = await Movie.findById(id);

    if (!movie) {
      return NextResponse.json({
        success: false,
        message: "Movie not found"
      },
        { status: 404 }
      )
    };

    return NextResponse.json({
      success: true,
      movie,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error.message
    },
      { status: 404 })
  }
};
