import { Request, Response } from "express";
import Message from "../models/messageModel";
import mongoose from "mongoose";
import { IUser } from "../models/userModel";

export const sendMessage = async (req: Request, res: Response) => {
  console.log("sendMessage function is called");
  try {
    const recipientUserId = req.params.userId;
    const { text, author } = req.body; // Include 'author' in the destructuring
    const user = req.user as IUser | undefined; // Use IUser and allow undefined

    // Create a new message
    const newMessage = new Message({
      recipientUser: recipientUserId, // Use the recipientUserId from the route
      author: user ? user._id : new mongoose.Types.ObjectId(author), // Allow using authenticated user if available
      text,
    });

    console.log("New message:", newMessage);

    await newMessage.save();

    return res.status(201).json(newMessage);
  } catch (error) {
    console.error("Error sending a message:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};








// MUCHO CUIDADO CON ESTA! FUNCIONA BIEN!!!
// import { Request, Response } from "express";
// import Message from "../models/messageModel";
// import mongoose from "mongoose";

// export const sendMessage = async (req: Request, res: Response) => {
//   console.log("sendMessage function is called");
//   try {
//     const recipientUserId = req.params.userId;
//     const { text, author } = req.body; // Include 'author' in the destructuring

//     // Create a new message
//     const newMessage = new Message({
//       recipientUser: recipientUserId, // Use the recipientUserId from the route
//       author: new mongoose.Types.ObjectId(author), // Use mongoose.Types.ObjectId directly
//       text,
//     });

//     console.log("New message:", newMessage);

//     await newMessage.save();

//     return res.status(201).json(newMessage);
//   } catch (error) {
//     console.error("Error sending a message:", error);
//     return res.status(500).json({ error: "Internal server error" });
//   }
// };

// esta funciona, anade el recipientuser, creo que todavia implementa logica de autenticacion
// export const sendMessage = async (req: Request, res: Response) => {
//   console.log("sendMessage function is called");
//   try {
//     const userId = req.params.userId;
//     const { text } = req.body;
//     const user = req.user as IUser; // Get the authenticated user

//     console.log("Recipient User ID from request parameters:", userId);
//     console.log("Authenticated user:", user);

//     // Create a new message
//     const newMessage = new Message({
//       recipientUser: userId, // Use the recipient user ID
//       text,
//     });

//     console.log("New message:", newMessage);

//     await newMessage.save();

//     return res.status(201).json(newMessage);
//   } catch (error) {
//     console.error("Error sending a message:", error);
//     return res.status(500).json({ error: "Internal server error" });
//   }
// };

// import { Request, Response } from "express";
// import Message from "../models/messageModel";
// import { IUser } from "../models/userModel";

// export const sendMessage = async (req: Request, res: Response) => {
//   try {
//     const userId = req.params.userId;
//     const { text } = req.body;
//     const user = req.user as IUser; // Get the authenticated user

//     // Create a new message
//     const newMessage = new Message({
//       user: userId, // Use the user ID of the recipient
//       text,
//     });

//     await newMessage.save();

//     return res.status(201).json(newMessage);
//   } catch (error) {
//     console.error("Error sending a message:", error);
//     return res.status(500).json({ error: "Internal server error" });
//   }
// };

// esta es la que funciona!!
// import { Request, Response } from "express";
// import Message from "../models/messageModel";
// import { IUser } from "../models/userModel";

// export const sendMessage = async (req: Request, res: Response) => {
//   console.log("sendMessage function is called");
//   try {
//     const userId = req.params.userId;
//     const { text } = req.body;
//     const user = req.user as IUser; // Get the authenticated user

//     console.log("User ID from request parameters:", userId);
//     console.log("Authenticated user:", user);

//     // Create a new message
//     const newMessage = new Message({
//       user: userId, // Use the user ID of the recipient
//       text,
//     });

//     console.log("New message:", newMessage);

//     await newMessage.save();

//     return res.status(201).json(newMessage);
//   } catch (error) {
//     console.error("Error sending a message:", error);
//     return res.status(500).json({ error: "Internal server error" });
//   }
// };
