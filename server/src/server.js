import cors from "cors";
import express from "express";
import dbConnect from "./config/dbConnect.js";
import bookingRouter from "./routes/bookingRouter.js";

const app = express();

app.use(express.json());
app.use(cors());
dbConnect();
app.use("/booking", bookingRouter);

app.listen(3002, () => {
  console.log("server is running on port 3000");
});
