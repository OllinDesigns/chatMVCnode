import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  googleId: string;
  displayName: string;
  messages: mongoose.Types.ObjectId[];
  author?: mongoose.Types.ObjectId;
}

const userSchema: Schema = new Schema({
  googleId: { type: String, required: true },
  displayName: { type: String, required: true },
  messages: [{ type: mongoose.Types.ObjectId, ref: "Message" }],
});

export default mongoose.model<IUser>("User", userSchema);
