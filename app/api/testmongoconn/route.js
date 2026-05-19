import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Movie from "@/models/Movie";
import Screening from "@/models/Screening";

//Test function to make sure that the screening model can be created, information can be pushed, and it can fetch from existing movies. 

const generateSeats = (rows, seatsPerRow) => {
  const seats = [];
  for (const row of rows) {
    for (let i = 1; i <= seatsPerRow; i++) {
      seats.push({ row, number: i, isBooked: false });
    }
  }
  return seats;
};

export async function GET() {
  try {
    await connectDB();

    // Fetch existing movie from DB
    const movie = await Movie.findOne({});
    console.log('found movie:', movie);

    if (!movie) {
      return NextResponse.json(
        { success: false, error: 'No movies found in the database' },
        { status: 404 }
      );
    }

    const sampleScreening = await Screening.create({
      movie: movie._id,
      startTime: new Date('2026-06-01T19:00:00.000Z'),
      room: 'Salong 1',
      totalSeats: 30,
      availableSeats: 30,
      seats: generateSeats(['A', 'B', 'C', 'D', 'E'], 6),
    });

    const found = await Screening.findById(sampleScreening._id);

    return NextResponse.json({
      success: true,
      message: 'Screening created and read back successfully',
      inserted: sampleScreening,
      readBack: found,
    });

  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

/* INITIAL MONGDB CONNECTION CHECK TO FETCH DATA FROM SAMPLE LIST
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

*/