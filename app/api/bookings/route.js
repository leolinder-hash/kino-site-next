import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Booking from "@/models/Booking";

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

