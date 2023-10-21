import { Request, Response } from "express";
import User from "../models/userModel";

export interface AuthenticatedUser {
  googleId: string;
  displayName: string;
}

export const createUserFromOAuth = async (userData: AuthenticatedUser) => {
  try {
    const { googleId, displayName } = userData;

    const existingUser = await User.findOne({ googleId });

    if (existingUser) {
      return existingUser;
    }

    const newUser = new User({
      googleId,
      displayName,
    });

    try {
      await newUser.save();
    } catch (error) {
      console.error("Error saving user:", error);
      throw new Error("Failed to save user data");
    }

    console.log(
      `function createUserFromOAuth from userController is being used`
    );

    return newUser;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
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
    const users = await User.find();

    return res.status(200).json(users);
  } catch (error) {
    console.error("Error getting users:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
