import { Request, Response } from "express";
import User from "../models/userModel";
import Message from "../models/messageModel"; // Import your message model

// Example controller function for creating a user profile after Google OAuth login:
export const createOrUpdateUserProfile = async (req: Request, res: Response) => {
  try {
    const { name } = req.body; // Get user's name from Google OAuth data
    const existingUser = await User.findOne({ name });

    if (existingUser) {
      // User profile already exists, update it if needed
      // You can add logic here to update other user information
      // For example, you might update the user's profile picture or other details from Google OAuth data
      res.status(200).json(existingUser);
    } else {
      // User profile doesn't exist, create a new one
      const newUser = new User({ name });
      await newUser.save();
      res.status(201).json(newUser);
    }
  } catch (error) {
    console.error("Error creating/updating user profile:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Function to render the chat page
export const getChatPage = (req: Request, res: Response) => {

    console.log(`route http://localhost:8080/chat has been called`);
    res.status(200).json({
        message:
          "Router handling successfully http://localhost:8080/chat. this will display the chat.",
      });
};

// Function to get messages (protected route)
export const getMessages = async (req: Request, res: Response) => {
  try {
    // Retrieve messages from your database (MongoDB) using your Message model
    const messages = await Message.find().sort({ date: -1 }); // Sort by date in descending order
    res.json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Function to send a message (protected route)
export const sendMessage = async (req: Request, res: Response) => {
  try {
    const { text, user } = req.body;

    // Create a new message using your Message model
    const message = new Message({ text, user });

    // Save the message to your database
    await message.save();

    // Send a success response
    res.status(201).json(message);
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
