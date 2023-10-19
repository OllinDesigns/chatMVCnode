import { Request, Response } from "express";
import Message from "../models/messageModel";
import { IUser } from "../models/userModel";
// import { getIo } from "../sockets";

export const sendMessage1 = async (req: Request, res: Response) => {
  console.log("sendMessage1 function is called");
  try {
    const { text } = req.body;

    const user = req.user as IUser | undefined;

    if (!user) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    // Create a new message with the authenticated user as the author
    const newMessage = new Message({
      author: user._id, // Automatically set the authenticated user's ID
      text,
    });

    console.log("New message:", newMessage);

    await newMessage.save();

    // const io = getIo();

    // io.emit("new-message", newMessage);

    return res.status(201).json(newMessage);
  } catch (error) {
    console.error("Error sending a message:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const getMessages = async (req: Request, res: Response) => {
  try {
    // Retrieve all messages from the database
    const messages = await Message.find();

    return res.status(200).json(messages);
  } catch (error) {
    console.error("Error getting messages:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
