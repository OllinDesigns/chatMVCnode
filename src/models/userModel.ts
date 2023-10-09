// src/models/userModel.ts
import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  // Add other fields as needed
}

const userSchema: Schema = new Schema({
  name: { type: String, required: true },
  // Define other fields here
});

export default mongoose.model<IUser>("User", userSchema);
