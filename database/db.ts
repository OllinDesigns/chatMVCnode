import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();


export const db = () => {
    const mongoConnectionString = process.env.MONGO_CONNECTION_STRING;
  
    if (!mongoConnectionString) {
      console.error(
        `MongoDB connection string not found in environment variables.`
      );
      process.exit(1);
    }
  
    mongoose
      .connect(mongoConnectionString)
      .then(() => {
        console.log(`Gurrus says hello from MongoDB.`);
      })
      .catch((err) => {
        console.error("Error connecting to MongoDB:", err);
      });
  };


  // export default mongoose.connection; 