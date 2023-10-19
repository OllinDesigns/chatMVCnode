import mongoose, { Schema, Document } from "mongoose";

export interface IChatMessage extends Document {
  text: string;
  author: string;
  createdAt: Date;
}

const chatMessageSchema: Schema = new Schema({
  text: { type: String, required: true },
  author: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IChatMessage>("ChatMessage", chatMessageSchema);

