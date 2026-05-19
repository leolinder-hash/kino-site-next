import mongoose from 'mongoose';

const SeatSchema = new mongoose.Schema({
  row: { type: String, required: true },
  number: { type: Number, required: true },
  isBooked: { type: Boolean, default: false },
});

const ScreeningSchema = new mongoose.Schema(
  {
    movie: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Movie',
      required: true,
    },
    startTime: {
      type: Date,
      required: true,
    },
    room: {
      type: String,
      required: true,
    },
    seats: [SeatSchema],
    totalSeats: {
      type: Number,
      required: true,
    },
    availableSeats: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Screening ||
  mongoose.model('Screening', ScreeningSchema);