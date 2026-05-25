import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Booking from "@/models/Booking";
import Screening from "@/models/Screening";

export async function POST(req) {
    try {
        await connectDB();
        const {
            userId,
            guestName,
            guestEmail,
            guestPhoneNumber,
            screeningId,
            seats,
            deliveryMethod,
            paymentMethod
        } = await req.json();

        const existingBooking = await Booking.findOne({
            screeningId,
            seats: { $in: seats },
            status: "confirmed"
        })

        if (existingBooking) {
            return NextResponse.json({
                success: false,
                error: "One or more selected seats are already booked for this screening."
            }, { status: 409 });
        }

        const screening = await Screening.findById(screeningId);

        seats.forEach((selectedSeat) => {
            const seat = screening.seats.find((seat) => {
                const seatCode = `${seat.row}${seat.number}`;
                return seatCode === selectedSeat;
            });

            if (seat) {
                seat.isBooked = true;
            }
        })

        screening.availableSeats -= seats.length;
        await screening.save();

        const booking = await Booking.create({
            userId,
            guestName,
            guestEmail,
            guestPhoneNumber,
            screeningId,
            seats,
            deliveryMethod,
            paymentMethod
        });

        return NextResponse.json({
            success: true,
            booking
        });
    } catch (error) {
        return NextResponse.json({
            success: false,
            error: error.message
        }, { status: 500 });
    }
}

