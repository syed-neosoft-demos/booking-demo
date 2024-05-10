import mongoose from "mongoose";

const dbConnect = async () => {
  try {
    const URI =process.env.MONGO_URI ??
      "mongodb+srv://devUser:pfHAOkZ3EAx6zFwB@freecluster.fzhgwor.mongodb.net/booking?retryWrites=true&w=majority&appName=freeCluster";
    const con = await mongoose.connect(URI);
    console.log("database connected successful");
  } catch (error) {
    console.log("error?.message", error?.message);
  }
};

export default dbConnect;
