import mongoose, { Schema, Document } from "mongoose";

export interface IMessage extends Document {
  user: mongoose.Types.ObjectId; // Reference to User model
  text: string;
  createdAt: Date;
}

const messageSchema: Schema = new Schema({
  user: { type: mongoose.Types.ObjectId, ref: "User", required: true }, // Reference to User model
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IMessage>("Message", messageSchema);




// import mongoose, { Schema, Document } from "mongoose";
// import { IUser } from "./userModel"; // Import your user model interface

// export interface IMessage extends Document {
//   userId: IUser["_id"]; // Refers to the user who sent the message
//   text: string;
//   createdAt: Date;
// }

// const messageSchema: Schema = new Schema({
//   userId: {
//     type: Schema.Types.ObjectId,
//     ref: "User", // Use the name of your user model as the ref
//     required: true,
//   },
//   text: { type: String, required: true },
//   createdAt: { type: Date, default: Date.now },
// });

// export default mongoose.model<IMessage>("Message", messageSchema);
