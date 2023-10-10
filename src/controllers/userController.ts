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

    // Return the newly created user
    return newUser;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error; // Handle any errors as needed
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const { googleId } = req.session.user as AuthenticatedUser;

    const existingUser = await User.findOne({ googleId });

    if (existingUser) {
      return res.status(200).json(existingUser);
    } else {
      const newUser = new User({
        googleId,
        displayName: req.session.user?.displayName,
      });

      await newUser.save();

      return res.status(201).json(newUser);
    }
  } catch (error) {
    console.error("Error creating user:", error);
    throw error; // Throw the error for handling in the calling function
  }
};


// export const createUser = async (req: Request, res: Response) => {
//   try {
//     const { googleId } = req.session.user as AuthenticatedUser;

//     const existingUser = await User.findOne({ googleId });

//     if (existingUser) {
//       res.status(200).json(existingUser);
//     } else {
//       const newUser = new User({
//         googleId,
//         displayName: req.session.user?.displayName,
//       });

//       await newUser.save();

//       res.status(201).json(newUser);
//     }
//   } catch (error) {
//     console.error("Error creating user:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

// Function to render the chat page
export const getChatPage = (req: Request, res: Response) => {
  console.log(`route http://localhost:8080/chat has been called`);
  res.status(200).json({
    message:
      "Router handling successfully http://localhost:8080/chat. This will display the chat.",
  });
};

// // src/controllers/userController.ts
// import { Request, Response } from "express";
// import User from "../models/userModel";

// export interface AuthenticatedUser {
//   googleId: string;
//   displayName: string;
//   // Add other properties as needed
// }

// export const createUserFromOAuth = async (userData: AuthenticatedUser) => {
//   try {
//     // Extract relevant user data from the userData object
//     const { googleId, displayName } = userData;

//     // Check if the user already exists in the database based on Google ID
//     const existingUser = await User.findOne({ googleId });

//     if (existingUser) {
//       // User already exists, return the existing user
//       return existingUser;
//     }

//     // User does not exist, create a new user document
//     const newUser = new User({
//       googleId,
//       name: displayName,
//       // Add other fields as needed
//     });

//     // Save the new user to the database
//     await newUser.save();

//     // Return the newly created user
//     return newUser;
//   } catch (error) {
//     console.error("Error creating user:", error);
//     throw error; // Handle any errors as needed
//   }
// };

// export const createUser = async (req: Request, res: Response, displayName?: string) => {
//   try {
//     // Type assertion to let TypeScript know that req.session.user is defined
//     const { googleId } = req.session.user as AuthenticatedUser;

//     // Check if the user already exists in the database
//     const existingUser = await User.findOne({ googleId });

//     if (existingUser) {
//       // User already exists, return the existing user
//       res.status(200).json(existingUser);
//     } else {
//       // User does not exist, create a new user document
//       const newUser = new User({
//         googleId,
//         name: displayName || (req.session.user && req.session.user.displayName) || '',

//         // Add other fields as needed
//       });

//       // Save the new user to the database
//       await newUser.save();

//       // Return the newly created user
//       res.status(201).json(newUser);
//     }
//   } catch (error) {
//     console.error("Error creating user:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

// // Function to render the chat page
// export const getChatPage = (req: Request, res: Response) => {
//   console.log(`route http://localhost:8080/chat has been called`);
//   res.status(200).json({
//     message:
//       "Router handling successfully http://localhost:8080/chat. This will display the chat.",
//   });
// };

// // src/controllers/userController.ts
// import { Request, Response } from "express";
// import User from "../models/userModel";

// export interface AuthenticatedUser {
//   googleId: string;
//   displayName: string;
//   // Add other properties as needed
// }

// export const createUserFromOAuth = async (userData: AuthenticatedUser) => {
//   try {
//     // Extract relevant user data from the userData object
//     const { googleId, displayName } = userData;

//     // Check if the user already exists in the database based on Google ID
//     const existingUser = await User.findOne({ googleId });

//     if (existingUser) {
//       // User already exists, return the existing user
//       return existingUser;
//     }

//     // User does not exist, create a new user document
//     const newUser = new User({
//       googleId,
//       name: displayName,
//       // Add other fields as needed
//     });

//     // Save the new user to the database
//     await newUser.save();

//     // Return the newly created user
//     return newUser;
//   } catch (error) {
//     console.error("Error creating user:", error);
//     throw error; // Handle any errors as needed
//   }
// };

// export const createUser = async (req: Request, res: Response) => {
//   try {
//     // Type assertion to let TypeScript know that req.session.user is defined
//     const { googleId, displayName } = req.session.user as AuthenticatedUser;

//     // Check if the user already exists in the database
//     const existingUser = await User.findOne({ googleId });

//     if (existingUser) {
//       // User already exists, return the existing user
//       res.status(200).json(existingUser);
//     } else {
//       // User does not exist, create a new user document
//       const newUser = new User({
//         googleId,
//         name: displayName,
//         // Add other fields as needed
//       });

//       // Save the new user to the database
//       await newUser.save();

//       // Return the newly created user
//       res.status(201).json(newUser);
//     }
//   } catch (error) {
//     console.error("Error creating user:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

//  // Function to render the chat page
// export const getChatPage = (req: Request, res: Response) => {

//     console.log(`route http://localhost:8080/chat has been called`);
//     res.status(200).json({
//         message:
//           "Router handling successfully http://localhost:8080/chat. this will display the chat.",
//       });
// };

// import { Request, Response } from "express";
// import User from "../models/userModel";

// // Define a custom interface for req.user
// export interface AuthenticatedUser {
//   googleId: string;
//   displayName: string;

//   // Add other properties as needed
// }

// export const createUserFromOAuth = async (userData: any) => {
//   try {
//     // Extract relevant user data from the userData object
//     const { googleId, displayName, email } = userData;

//     // Check if the user already exists in the database based on Google ID or email
//     const existingUser = await User.findOne({ $or: [{ googleId }, { email }] });

//     if (existingUser) {
//       // User already exists, return the existing user
//       return existingUser;
//     }

//     // User does not exist, create a new user document
//     const newUser = new User({
//       googleId,
//       name: displayName,
//       email, // Add other fields as needed
//     });

//     // Save the new user to the database
//     await newUser.save();

//     // Return the newly created user
//     return newUser;
//   } catch (error) {
//     console.error("Error creating user:", error);
//     throw error; // Handle any errors as needed
//   }
// };

// // Function to render the chat page
// export const getChatPage = (req: Request, res: Response) => {

//     console.log(`route http://localhost:8080/chat has been called`);
//     res.status(200).json({
//         message:
//           "Router handling successfully http://localhost:8080/chat. this will display the chat.",
//       });
// };
