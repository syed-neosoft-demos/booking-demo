import mongoose from "mongoose";
const { Schema } = mongoose;

const seatSchema = new Schema({
  rowNumber: {
    type: String,
    required: true,
  },
  seatNumber: {
    type: String,
    required: true,
    unique: true,
  },
});

const SeatModel = mongoose.model("seat", seatSchema);
export default SeatModel;
