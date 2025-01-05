import mongoose from "mongoose";

type ConnectionObject = {
  isConnected?: number;
};

const connection: ConnectionObject = {};

// async function dbConnect(): Promise<void> {
//   if (connection.isConnected) {
//     console.log("already connected");
//     return;
//   }

//   try {
//     // console.log("MongoDB URI:", process.env.MONGODB_URI);
//     const db = await mongoose.connect(process.env.MONGODB_URI!);
//     connection.isConnected = db.connections[0].readyState;
//     console.log("connected to db");
//   } catch (error) {
//     console.log("db connection failed", error);
//     process.exit(1);
//   }
// }

async function dbConnect(): Promise<void> {
  if (connection.isConnected) {
    console.log("already connected");
    return;
  }

  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI environment variable is not set");
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI);
    connection.isConnected = db.connections[0].readyState;
    console.log("connected to db");
  } catch (error) {
    console.log("db connection failed", error);
    process.exit(1);
  }
}

export default dbConnect;

// const mongoose = require("mongoose");

// const connectDb = async () => {
//   try {
//     const connect = await mongoose.connect(process.env.CONNECTION_STRING || "");
//     console.log(
//       "Database Connected :",
//       connect.connection.host,
//       connect.connection.name
//     );
//   } catch (err) {
//     console.log(err);
//     process.exit(1);
//   }
// };

// module.exports = connectDb;
