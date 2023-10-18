// src/controllers/userController.ts
import { Request, Response } from "express";
import User from "../models/userModel"; // Import the IUser interface

export interface AuthenticatedUser {
  googleId: string;
  displayName: string;
  // Add other properties as needed
}

export const createUserFromOAuth = async (userData: AuthenticatedUser) => {
  try {
    // Extract relevant user data from the userData object
    const { googleId, displayName } = userData;

    // Check if the user already exists in the database based on Google ID
    const existingUser = await User.findOne({ googleId });

    if (existingUser) {
      // User already exists, return the existing user
      return existingUser;
    }

    // User does not exist, create a new user document
    const newUser = new User({
      googleId,
      displayName, // Use displayName directly
      // Add other fields as needed
    });

    // Save the new user to the database
    await newUser.save();

    console.log(
      `function createUserFromOAuth from userController is being used`
    );

    // Return the newly created user
    return newUser;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error; // Handle any errors as needed
  }
};

export const findUserByGoogleId = async (googleId: string) => {
  try {
    return await User.findOne({ googleId });
  } catch (error) {
    console.error("Error finding user by Google ID:", error);
    throw error;
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    // Retrieve all users from the database
    const users = await User.find();

    // Respond with the list of users
    return res.status(200).json(users);
  } catch (error) {
    console.error("Error getting users:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Function to render the chat page
export const getChatPage = (req: Request, res: Response) => {
  console.log(`route http://localhost:8080/chat has been called`);
  res.status(200).json({
    message:
      "Router handling successfully http://localhost:8080/chat. This will display the chat.",
  });
};
