import { Request, Response } from "express";
import Message from "../models/messageModel";
import { IUser } from "../models/userModel";

export const sendMessage1 = async (req: Request, res: Response) => {
  try {
    const { text } = req.body;
    if (!text || typeof text !== "string") {
      return res.status(400).json({ error: "Invalid message text" });
    }

    if (!text) {
      return res.status(400).json({ error: "Text cannot be empty" });
    }

    const user = req.user as IUser | undefined;

    if (!user) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    const newMessage = new Message({
      author: user._id,
      text,
    });

    // console.log("New message:", newMessage);
    user.messages.push(newMessage._id);

    await newMessage.save();

    return res.status(201).json(newMessage);
  } catch (error) {
    console.error("Error sending a message:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const getMessages = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const messages = await Message.find();

    return res.status(200).json(messages);
  } catch (error) {
    console.error("Error getting messages:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
