import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { connectDB } from '@/lib/mongodb';
import Review from '@/models/Review';
import '@/models/User';
import '@/models/Movie';

export async function GET(request) {
    try {
        await connectDB();

        const { searchParams } = new URL(request.url);
        const movieId = searchParams.get('movieId');

        const filter = movieId ? { movie: movieId } : {};

        const reviews = await Review.find(filter)
        .populate('user', 'username')
        .sort({ createdAt: -1 });

        return NextResponse.json(reviews, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { error: 'Kunde inte hämta recensioner.' },
            { status: 500 }
        );
    }
}


export async function POST(request) {
    try {
        await connectDB();
        const body = await request.json();
        const { movie, user } = body;

        if (movie && !mongoose.Types.ObjectId.isValid(movie)) {
            return NextResponse.json(
                { error: 'Ogiltigt format på film-ID.' },
                { status: 400 }
            );
        }

        if (user && !mongoose.Types.ObjectId.isValid(user)) {
            return NextResponse.json(
                { error: 'Ogiltigt format på användar-ID.' },
                { status: 400 }
            );
        }

        const newReview = new Review(body);
        await newReview.save();

        return NextResponse.json(newReview, { status: 201 });
    } catch (error) {
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map((err) => err.message);
            return NextResponse.json({ error: messages.join(', ') }, { status: 400 });
        }

        if (error.name === 'CastError') {
            return NextResponse.json(
                { error: `Ogiltigt ID-format för fältet: ${error.path}.` },
                { status: 400 }
            );
        }

        if (error.code === 11000) {
            return NextResponse.json(
                { error: 'Du har redan lämnat en recension för denna film.' },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { error: 'Ett oväntat fel uppstod vid skapandet.' },
            { status: 500 }
        );
    }
}
