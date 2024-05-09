import express from "express";
import { handleBooking, handleChart } from "../controllers/bookingController.js";

const router = express.Router();

router.get("/book", (req, res) => {
  try {
    res.status(200).send("hello");
  } catch (error) {}
});

router.post("/booked", handleBooking);
router.get("/chart", handleChart);

export default router;
