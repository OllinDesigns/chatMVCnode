import { Request, Response, NextFunction } from "express";
import passport from "passport";
import * as userController from "../controllers/userController";
import { IUser } from "src/models/userModel";

interface AuthenticatedUser {
  googleId: string;
  displayName: string;
  // Add other properties as needed
}

declare module "express-session" {
  interface Session {
    user: AuthenticatedUser | undefined;
  }
}

// Middleware to check if the user is authenticated
export const isLoggedIn = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ error: "Access denied. Please log in." });
};

export const authenticateGoogle = passport.authenticate("google", {
  scope: ["email", "profile"],
});

export const handleGoogleCallback = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  passport.authenticate("google", async (err: any, user: IUser, info: any) => {
    if (err) {
      // Handle authentication error
      console.error("Authentication error:", err);
      return res.redirect("/auth/google/failure");
    }

    if (!user) {
      // Handle failed authentication
      console.error("Authentication failed.");
      return res.redirect("/auth/google/failure");
    }

    try {
      // Check if the user already exists in the database
      const existingUser = await userController.findUserByGoogleId(
        user.googleId
      );

      if (!existingUser) {
        // User doesn't exist, insert them into the database
        const createdUser = await userController.createUserFromOAuth({
          googleId: user.googleId,
          displayName: user.displayName,
        });

        // Store the user data in the session
        req.session.user = {
          googleId: createdUser.googleId,
          displayName: createdUser.displayName,
          // Add other properties as needed
        };

        console.log("User added to MongoDB:", createdUser.displayName);
      } else {
        // The user exists, open a passport session for them
        req.login(existingUser, (loginErr) => {
          if (loginErr) {
            console.error("Error opening passport session:", loginErr);
            return res.redirect("/auth/google/failure");
          }

          // Store the user data in the session
          req.session.user = {
            googleId: existingUser.googleId,
            displayName: existingUser.displayName,
            // Add other properties as needed
          };

          console.log(
            "User already exists in the database:",
            existingUser.displayName
          );
        });
      }

      console.log("User added to session:", req.session.user);
      console.log("Session data:", req.session);
      return res.redirect("/auth/google/success");
    } catch (error) {
      console.error("Error during authentication:", error);
      return res.redirect("/auth/google/failure");
    }
  })(req, res, next);
};

export const handleGoogleSuccess = (req: Request, res: Response) => {
  // Check if the user is authenticated and their information is in the session
  if (req.session.user) {
    const { googleId, displayName } = req.session.user;

    // Include the user's information in the success message
    res.status(200).json({
      message: `Google authentication successful for ${displayName} (Google ID: ${googleId})`,
    });
  } else {
    // Handle the case where the user's information is not available
    res.status(401).json({ error: "User not authenticated" });
  }
};

export const handleLogout = (req: Request, res: Response) => {
  req.logout((err: any) => {
    if (err) {
      console.error("Error logging out:", err);
    }
  });
  res.send("Goodbye!");
};
