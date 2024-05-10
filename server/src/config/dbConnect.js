import mongoose from "mongoose";

const dbConnect = async () => {
  try {
    const con = await mongoose.connect(process.env.MONGO_URI);
    console.log("database connected successful");
  } catch (error) {
    console.log("error?.message", error?.message);
  }
};

export default dbConnect;
