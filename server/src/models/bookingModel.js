import mongoose from "mongoose";
const { Schema } = mongoose;

const bookingSchema = new Schema({
  rowNumber: {
    type: String,
    required: true,
  },
  seatNumber: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
});

const BookingModel = mongoose.model("booking", bookingSchema);
export default BookingModel;
