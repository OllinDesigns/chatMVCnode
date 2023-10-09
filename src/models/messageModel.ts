import mongoose, { Schema, Document } from "mongoose";

export interface IMessage extends Document {
  text: string;
  user: string; // This should be the user's ID or a reference to the User model
  date: Date;
}

const messageSchema: Schema = new Schema({
  text: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: Date, default: Date.now },
});

const Message = mongoose.model<IMessage>("Message", messageSchema);

export default Message;





// // src/models/messageModel.ts
// import mongoose, { Schema, Document } from "mongoose";

// export interface IMessage extends Document {
//   text: string;
//   user: string; // This should be the user's ID or a reference to the User model
//   date: Date;
// }

// const messageSchema: Schema = new Schema({
//   text: { type: String, required: true },
//   user: { type: Schema.Types.ObjectId, ref: "User", required: true },
//   date: { type: Date, default: Date.now }, // Automatically set to the current date/time
// });

// const Message = mongoose.model<IMessage>("Message", messageSchema);

// export default Message;
