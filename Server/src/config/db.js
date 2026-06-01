import mongoose from "mongoose";

const DBconnect = async () => {
  try {
     await mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/april-mern")
    console.log("MongoDB connected Sucess.");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};

export default DBconnect;