import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Booking from "@/models/Booking";
import Screening from "@/models/Screening";

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

        const screening= await Screening.findById(booking.screeningId);
       
        booking.seats.forEach(bookedSeat => {
            const seat = screening.seats.find((seat) => {
                const seatCode = `${seat.row}${seat.number}`;
                return seatCode === bookedSeat;
            })

            if (seat) {
                seat.isBooked = false;
            }
        });

        screening.availableSeats += booking.seats.length;
        await screening.save();

        return NextResponse.json({
            success: true,
            message: "Booking cancelled and seats released", booking
        });

    } catch (error) {
        return NextResponse.json({
            success: false,
            error: error.message
        }, { status: 500 });
    }
}