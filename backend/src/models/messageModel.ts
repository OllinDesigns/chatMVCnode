import mongoose, { Schema, Document } from "mongoose";

export interface IMessage extends Document {
  author: mongoose.Types.ObjectId;
  text: string;
  createdAt: Date;
}

const messageSchema: Schema = new Schema({
  author: { type: mongoose.Types.ObjectId, ref: "User", required: true },
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IMessage>("Message", messageSchema);