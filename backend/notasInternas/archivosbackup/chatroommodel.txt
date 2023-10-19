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


// import mongoose, { Schema, Document } from "mongoose";

// export interface IChatRoom extends Document {
//   chatMessages: IChatMessage[];
// }

// export interface IChatMessage extends Document {
//   recipientUser: mongoose.Types.ObjectId; // Reference to User model
//   author: mongoose.Types.ObjectId; // Reference to User model
//   text: string;
//   createdAt: Date;
// }

// const chatMessageSchema: Schema = new Schema({
//   recipientUser: { type: mongoose.Types.ObjectId, ref: "User", required: true }, // Reference to User model
//   author: { type: mongoose.Types.ObjectId, ref: "User", required: true }, // Reference to User model
//   text: { type: String, required: true },
//   createdAt: { type: Date, default: Date.now },
 
//   // text: { type: String, required: true },
//   // author: { type: mongoose.Types.ObjectId, ref: "User", required: true }, // Reference to User model
//   // createdAt: { type: Date, default: Date.now },
// });

// const chatRoomSchema: Schema = new Schema({
//   chatMessages: [chatMessageSchema], // An array of chat messages
// });

// export default mongoose.model<IChatRoom>("ChatRoom", chatRoomSchema);
