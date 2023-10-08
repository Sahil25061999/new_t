import mongoose from "mongoose";

export async function connect() {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    const connection = mongoose.connection;
    connection.on("connect", () => {
      console.log("Mongodb connected successfully");
    });
  } catch (e) {
    console.log("Error connecting to mongodb");
    console.log(e);
  }
}
