import mongoose from "mongoose";

export const connectToMongoDB = async (connectionString) => {
  try {
    if (!connectionString) {
      throw new Error("Connection string is required to connect to MongoDB.");
    }

    const conn = await mongoose.connect(connectionString);

    if (conn) {
      console.log("MongoDB connected successfully.");
    }
  } catch (error) {
    console.log("Error connecting to MongoDB : ", error.message);
  }
};
