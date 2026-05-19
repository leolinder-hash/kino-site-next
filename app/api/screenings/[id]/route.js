import mongoose from "mongoose";
import { connectDB } from "../../../../lib/mongodb.js";
import Screening from "../../../../models/screening.js";
import Movie from "../../../../models/Movie.js";

export async function GET(request, { params }) {
  try {
    await connectDB();

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return Response.json(
        {
          success: false,
          message: "Invalid screening id",
        },
        { status: 400 }
      );
    }

    const screening = await Screening.findById(id).populate("movie");

    if (!screening) {
      return Response.json(
        {
          success: false,
          message: "Screening not found",
        },
        { status: 404 }
      );
    }

    return Response.json(
      {
        success: true,
        screening,
      },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: "Could not fetch screening",
        error: error.message,
      },
      { status: 500 }
    );
  }
}