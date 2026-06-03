import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { connectDB } from "@/lib/mongodb";
import Booking from "@/models/Booking";
import Screening from "@/models/Screening";
import { AUTH_COOKIE_NAME, verifyAuthToken } from "@/lib/auth";

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

        let verifiedUserId = null;
        try {
            const cookieStore = await cookies();
            const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;
            if (token) {
                const decoded = verifyAuthToken(token);
                if (decoded && decoded.userId) {
                    verifiedUserId = decoded.userId;
                }
            }
        } catch (cookieError) {
            console.error("Error reading auth cookie:", cookieError);
        }

        const existingBooking = await Booking.findOne({
            screeningId,
            seats: { $in: seats },
            status: "confirmed"
        });

        if (existingBooking) {
            return NextResponse.json({
                success: false,
                error: "One or more selected seats are already booked for this screening."
            }, { status: 409 });
        }

        const screening = await Screening.findById(screeningId);

        if (!screening) {
            return NextResponse.json({
                success: false,
                error: "Screening not found"
            }, { status: 404 });
        }

        const missingSeats = seats.filter(selectedSeat => {
            const seat = screening.seats.find((seat) => {
                const seatCode = `${seat.row}${seat.number}`;
                return seatCode === selectedSeat;
            });

            return !seat || seat.isBooked;

        });

        if (missingSeats.length > 0) {
            return NextResponse.json({
                success: false,
                error: "One or more selected seats are not available."
            }, { status: 400 });
        }

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

        /*
        const bookingData = {
            screeningId,
            seats,
            deliveryMethod,
            paymentMethod
        };

        if (verifiedUserId) {
            bookingData.userId = verifiedUserId;
        } else {
            bookingData.guestName = guestName;
            bookingData.guestEmail = guestEmail;
            bookingData.guestPhoneNumber = guestPhoneNumber;
        }

        const booking = await Booking.create(bookingData);

        */

        const booking = await Booking.create({
            userId: verifiedUserId || undefined,
            guestName: verifiedUserId ? undefined : guestName,
            guestEmail: verifiedUserId ? undefined : guestEmail,
            guestPhoneNumber: verifiedUserId ? undefined : guestPhoneNumber,
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

export async function GET() {
    try {
        await connectDB();
        const cookieStore = await cookies();
        const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;
        if (!token) {
            return NextResponse.json({
                success: false,
                error: "Authentication required"
            }, { status: 401 });
        }

        const decoded = verifyAuthToken(token);
        if (!decoded || !decoded.userId) {
            return NextResponse.json({
                success: false,
                error: "Invalid or expired token"
            }, { status: 401 });
        }

        const bookings = await Booking.find({ userId: decoded.userId })
            .populate({
                path: "screeningId",
                populate: {
                    path: "movie"
                }
            })
            .sort({ bookingDate: -1 });

        return NextResponse.json({
            success: true,
            bookings
        }, { status: 200 });

    } catch (error) {
        return NextResponse.json({
            success: false,
            error: error.message
        }, { status: 500 });
    }
}