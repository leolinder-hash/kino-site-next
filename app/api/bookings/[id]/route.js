import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Booking from "@/models/Booking";

export async function DELETE(req, { params }) {
    try {
        await connectDB();
        const { id } = await params;
        const booking = await Booking.findByIdAndUpdate(
            id,
            { status: "cancelled" },
            { returnDocument: "after" }
        );

        if (!booking) {
            return NextResponse.json({
                success: false,
                error: "Booking not found"
            }, { status: 404 });
        }

        return NextResponse.json({
            success: true,
            message: "Booking cancelled", booking
        });

    } catch (error) {
        return NextResponse.json({
            success: false,
            error: error.message
        }, { status: 500 });
    }
}