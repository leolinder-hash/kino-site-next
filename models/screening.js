import mongoose from 'mongoose';

//create embedded array as sub schema for seats
//have to be generated when creating a screening

//IMPORTANT : booking.js stores seat as string not as object, so API would have to enable coversion between both formats.

const SeatSchema = new mongoose.Schema({
  row: { type: String, required: true },       
  number: { type: Number, required: true },    
  isBooked: { type: Boolean, default: false }, 
});

const ScreeningSchema = new mongoose.Schema(
  {
    movie: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Movie',       // links to Movie id from movie.js
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
    seats: [SeatSchema],  // embedded array of all seats in the room. BOOKING SAVES THIS AS STRING, API CONVERTS TO OBJECT
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