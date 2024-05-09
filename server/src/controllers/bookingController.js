import BookingModel from "../models/bookingModel.js";
import SeatModel from "../models/seatModel.js";
import { getReserveSeat } from "../utils/booking-help.js";

export const handleBooking = async (req, res) => {
  try {
    const numberOfSeats = req.body.numberOfSeats;
    if (numberOfSeats > 7) {
      return res.status(400).json({ message: "You can book max 7 seat at a time" });
    }
    const seat = await SeatModel.find({});
    const bookedSeat = await BookingModel.find({});
    const reserveSeat = await getReserveSeat(seat, bookedSeat);
    const availableSeat = seat.filter(
      (item) => !reserveSeat.find((el) => el?.seatNumber === item.seatNumber)
    );

    if (seat?.length === reserveSeat?.length) throw new Error("No seat available");
    //GET AVAILABLE SEATS
    if (numberOfSeats > availableSeat.length) throw new Error("No seat available");
    const processingSeat = [];
    //BOOKED SEATS IF SEATS AVAILABLE IN A ROW
    for (let row = 1; row <= 5; row++) {
      let rowSeat = availableSeat.filter((item) => item.rowNumber === `R${row}`);
      if (rowSeat.length >= numberOfSeats) {
        const rowData = rowSeat.slice(0, numberOfSeats);
        const processingSeat = [];
        rowData.forEach((item) =>
          processingSeat.push({
            seatNumber: item.seatNumber,
            rowNumber: item.rowNumber,
            status: "booked",
          })
        );
        console.log("processingSeat", processingSeat);
        await BookingModel.insertMany(processingSeat);
        break;
      }
    }
    res.status(200).send("created");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const handleChart = async (req, res) => {
  try {
    const seat = await SeatModel.find({}).sort({ rowNumber: 1 });
    const bookedSeat = await BookingModel.find({});
    const reserveSeat = await getReserveSeat(seat, bookedSeat);
    const availableSeat = seat.filter(
      (item) => !reserveSeat.find((el) => el?.seatNumber === item.seatNumber)
    );
    const seatStatus = [];
    for (let i = 0; i < seat.length; i++) {
      if (reserveSeat.find((el) => el?.seatNumber === seat[i].seatNumber)) {
        seatStatus.push({
          rowNumber: seat[i].rowNumber,
          seatNumber: seat[i].seatNumber,
          status: "booked",
        });
      } else {
        seatStatus.push({
          rowNumber: seat[i].rowNumber,
          seatNumber: seat[i].seatNumber,
          status: "available",
        });
      }
    }
    res.status(200).send(seatStatus);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
