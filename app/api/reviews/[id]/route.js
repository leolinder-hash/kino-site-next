import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { connectDB }from '@/lib/mongodb';
import Review from '@/models/Review';

export async function DELETE(request, { params }) {
    try {
        await connectDB();

        const resolvedParams = await params;
        const { id } = resolvedParams;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json(
                { error: 'Ogiltigt ID-format.' },
                { status: 400 }
            );
        }

        const deletedReview = await Review.findByIdAndDelete(id);

        if (!deletedReview) {
            return NextResponse.json(
                { error: 'Recensionen hittades inte.' },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { message: 'Recensionen har raderats.' },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { error: 'Kunde inte radera recensionen.' },
            { status: 500 }
        );
    }
}
