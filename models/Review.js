import mongoose from 'mongoose';

import './User.js';
import './Movie.js';

const { Schema, model, models } = mongoose;

const reviewSchema = new Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        movie: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Movie',
            required: true,
        },
        rating: {
            type: Number,
            required: true,
            min: [1, 'The rating cannot be lower than 1'],
            max: [5, 'The rating cannot be higher than 5'],
            validate: {
                validator: Number.isInteger,
                message: 'The rating must be a whole number.'
            }
        },
        reviewText: {
            type: String,
            required: true,
            trim: true,
            maxLength: [1000, 'The review cannot exceed 1000 characters.']
        },
    },
    {
        timestamps: true,
    }
);

reviewSchema.index({ user: 1, movie: 1 }, { unique: true });

const Review = models.Review || model('Review', reviewSchema);

export default Review;
