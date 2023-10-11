import { Request, Response } from "express";
import Message from "../models/messageModel";
import { IUser } from "../models/userModel";

export const sendMessage = async (req: Request, res: Response) => {
  console.log("sendMessage function is called");
  try {
    const userId = req.params.userId;
    const { text } = req.body;
    const user = req.user as IUser; // Get the authenticated user

    console.log("User ID from request parameters:", userId);
    console.log("Authenticated user:", user);

    // Create a new message
    const newMessage = new Message({
      user: userId, // Use the user ID of the recipient
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

