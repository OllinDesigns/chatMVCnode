import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  // name: string;
  googleId: string; // Add Google ID field
  displayName: string; // Add display name field
  // Add other fields as needed
}

const userSchema: Schema = new Schema({
  // name: { type: String, required: true },
  googleId: { type: String, required: true }, // Define Google ID field
  displayName: { type: String, required: true }, // Define display name field
  // Define other fields here
});

export default mongoose.model<IUser>("User", userSchema);





// import mongoose, { Schema, Document } from "mongoose";

// export interface IUser extends Document {
//   name: string;
//   // Add other fields as needed
// }

// const userSchema: Schema = new Schema({
//   name: { type: String, required: true },
//   // Define other fields here
// });

// export default mongoose.model<IUser>("User", userSchema);







// import mongoose, { Schema, Document } from "mongoose";

// export interface IUser extends Document {
//   name: string;
//   // Add other fields as needed
// }

// const userSchema: Schema = new Schema({
//   name: { type: String, required: true },
//   // Define other fields here
// });

// export default mongoose.model<IUser>("User", userSchema);



// // src/models/userModel.ts
// import mongoose, { Schema, Document, Model } from "mongoose";

// export interface IUser extends Document {
//   name: string;
//   // Add other fields as needed
// }

// const userSchema: Schema = new Schema({
//   name: { type: String, required: true },
//   // Define other fields here
// });

// const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);

// export default User;




// // este es el original src/models/userModel.ts
// import mongoose, { Schema, Document } from "mongoose";

// export interface IUser extends Document {
//   name: string;
//   // Add other fields as needed
// }

// const userSchema: Schema = new Schema({
//   name: { type: String, required: true },
//   // Define other fields here
// });

// export default mongoose.model<IUser>("User", userSchema);








// //esta es la ultima version propuesta por gpt que no funciona src/models/userModel.ts
// import mongoose, { Schema, Document } from "mongoose";

// export interface IUser extends Document {
//   name: string;
//   email: string;
//   password: string;
//   googleId: string;
//   // Add other fields as needed
// }

// const userSchema: Schema = new Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true },
//   password: { type: String, required: true },
//   googleId: { type: String },
//   // Define other fields here
// });

// export default mongoose.model<IUser>("User", userSchema);




// import mongoose, { Schema, Document } from "mongoose";

// export interface IUser extends Document {
//   name: string;
//   email: string;
//   password: string; // You might store the hashed password here
//   googleId: string; // For storing the Google OAuth user ID
//   // Add other fields as needed, such as profile picture URL, role, etc.
// }

// const userSchema: Schema = new Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true, unique: true }, // Example email field
//   password: { type: String, required: true }, // Example password field
//   googleId: { type: String, unique: true }, // Example Google OAuth ID field
//   // Define other fields here
// });

// export default mongoose.model<IUser>("User", userSchema);




//este funciona // src/models/userModel.ts
// import mongoose, { Schema, Document } from "mongoose";

// export interface IUser extends Document {
//   name: string;
//   // Add other fields as needed
// }

// const userSchema: Schema = new Schema({
//   name: { type: String, required: true },
//   // Define other fields here
// });

// export default mongoose.model<IUser>("User", userSchema);
