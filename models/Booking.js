import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false
    },

    guestName: {
        type: String,
        required: function () {
            return !this.userId;
        },
        trim: true
    },

    guestEmail: {
        type: String,
        required: function () {
            return !this.userId;
        },
        trim: true
    },

    guestPhoneNumber: {
        type: String,
        required: function () {
            return !this.userId;
        },
        trim: true
    },

    screeningId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Screening',
        required: true
    },

    seats: {
        type: [String],
        required: true,
        validate: {
            validator: function (value) {
                return value.length > 0;
            },
            message: "At least one seat must be selected"
        }
    },

    deliveryMethod: {
        type: String,
        enum: ["email", "sms", "pickup"],
        default: "email"
    },

    paymentMethod: {
        type: String,
        enum: ["card", "swish", "giftcard", "counter"],
        default: "card"
    },

    status: {
        type: String,
        enum: ['confirmed', 'cancelled'],
        default: 'confirmed'
    },

    bookingDate: {
        type: Date,
        default: Date.now
    }
});

const Booking = mongoose.models.Booking || mongoose.model('Booking', bookingSchema);
export default Booking;