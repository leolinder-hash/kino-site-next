import { connectDB } from "../../../lib/mongodb.js";
import Screening from "../../../models/Screening.js";
import Movie from "../../../models/Movie.js";

export async function GET() {
  try {
    await connectDB();

    const screenings = await Screening.find().populate("movie");

    return Response.json(
      {
        success: true,
        count: screenings.length,
        screenings,
      },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: "Could not fetch screenings",
        error: error.message,
      },
      { status: 500 }
    );
  }
}