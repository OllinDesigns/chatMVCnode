
import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  googleId: string;
  displayName: string;
  messages: mongoose.Types.ObjectId[]; // Add a reference to messages
  author?: mongoose.Types.ObjectId; // Add an optional author field
}

const userSchema: Schema = new Schema({
  googleId: { type: String, required: true },
  displayName: { type: String, required: true },
  messages: [{ type: mongoose.Types.ObjectId, ref: "Message" }], // Reference to Message model
});

export default mongoose.model<IUser>("User", userSchema);





// esta es la actual. cuidado con ella
// import mongoose, { Schema, Document } from "mongoose";

// export interface IUser extends Document {
//   googleId: string;
//   displayName: string;
//   messages: mongoose.Types.ObjectId[]; // Add a reference to messages
// }

// const userSchema: Schema = new Schema({
//   googleId: { type: String, required: true },
//   displayName: { type: String, required: true },
//   messages: [{ type: mongoose.Types.ObjectId, ref: "Message" }], // Reference to Message model
// });

// export default mongoose.model<IUser>("User", userSchema);



// import mongoose, { Schema, Document } from "mongoose";

// export interface IUser extends Document {
//   googleId: string;
//   displayName: string;
// }

// const userSchema: Schema = new Schema({
//   googleId: { type: String, required: true },
//   displayName: { type: String, required: true },
// });

// export default mongoose.model<IUser>("User", userSchema);
