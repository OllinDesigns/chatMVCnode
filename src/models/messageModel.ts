import mongoose, { Schema, Document } from "mongoose";

export interface IMessage extends Document {
  author: mongoose.Types.ObjectId; // Reference to User model
  text: string;
  createdAt: Date;
}

const messageSchema: Schema = new Schema({
  author: { type: mongoose.Types.ObjectId, ref: "User", required: true }, // Reference to User model
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IMessage>("Message", messageSchema);






// GUARDAR BIEN ESTE MODELO, SIRVE PARA REALTIME MESSAGES
// import mongoose, { Schema, Document } from "mongoose";

// export interface IMessage extends Document {
//   recipientUser: mongoose.Types.ObjectId; // Reference to User model
//   author: mongoose.Types.ObjectId; // Reference to User model
//   text: string;
//   createdAt: Date;
// }

// const messageSchema: Schema = new Schema({
//   recipientUser: { type: mongoose.Types.ObjectId, ref: "User", required: true }, // Reference to User model
//   author: { type: mongoose.Types.ObjectId, ref: "User", required: true }, // Reference to User model
//   text: { type: String, required: true },
//   createdAt: { type: Date, default: Date.now },
// });

// export default mongoose.model<IMessage>("Message", messageSchema);






// este modelo esta acoplado con una funcion que tiene logica de implementacion buscando un usuario auteticado, por eso no funciona. tenerlo en cuenta
// import mongoose, { Schema, Document } from "mongoose";

// export interface IMessage extends Document {
//   recipientUser: mongoose.Types.ObjectId; // Reference to User model
//   text: string;
//   createdAt: Date;
//   author: mongoose.Types.ObjectId; // Reference to User model as author
// }

// const messageSchema: Schema = new Schema({
//   recipientUser: { type: mongoose.Types.ObjectId, ref: "User", required: true }, // Reference to User model
//   text: { type: String, required: true },
//   createdAt: { type: Date, default: Date.now },
//   author: { type: mongoose.Types.ObjectId, ref: "User", required: true }, // Reference to User model as author
// });

// export default mongoose.model<IMessage>("Message", messageSchema);

// funciona, inserta el recipientId

// import mongoose, { Schema, Document } from "mongoose";

// export interface IMessage extends Document {
//   recipientUser: mongoose.Types.ObjectId; // Reference to User model
//   text: string;
//   createdAt: Date;
// }

// const messageSchema: Schema = new Schema({
//   recipientUser: { type: mongoose.Types.ObjectId, ref: "User", required: true }, // Reference to User model
//   text: { type: String, required: true },
//   createdAt: { type: Date, default: Date.now },
// });

// export default mongoose.model<IMessage>("Message", messageSchema);

// este funciona, version actual
// import mongoose, { Schema, Document } from "mongoose";

// export interface IMessage extends Document {
//   user: mongoose.Types.ObjectId; // Reference to User model
//   text: string;
//   createdAt: Date;
// }

// const messageSchema: Schema = new Schema({
//   user: { type: mongoose.Types.ObjectId, ref: "User", required: true }, // Reference to User model
//   text: { type: String, required: true },
//   createdAt: { type: Date, default: Date.now },
// });

// export default mongoose.model<IMessage>("Message", messageSchema);
