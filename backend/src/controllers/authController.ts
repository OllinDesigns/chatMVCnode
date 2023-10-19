import { Request, Response, NextFunction } from "express";
import passport from "passport";
import * as userController from "../controllers/userController";
import { IUser } from "src/models/userModel";

interface AuthenticatedUser {
  googleId: string;
  displayName: string;
}

declare module "express-session" {
  interface Session {
    user: AuthenticatedUser | undefined;
  }
}

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
      console.error("Authentication error:", err);
      return res.redirect("/auth/google/failure");
    }

    if (!user) {
      console.error("Authentication failed.");
      return res.redirect("/auth/google/failure");
    }

    try {
      const existingUser = await userController.findUserByGoogleId(
        user.googleId
      );

      if (!existingUser) {
        const createdUser = await userController.createUserFromOAuth({
          googleId: user.googleId,
          displayName: user.displayName,
        });

        req.session.user = {
          googleId: createdUser.googleId,
          displayName: createdUser.displayName,
        };

        console.log("User added to MongoDB:", createdUser.displayName);
      } else {
        req.login(existingUser, (loginErr) => {
          if (loginErr) {
            console.error("Error opening passport session:", loginErr);
            return res.redirect("/auth/google/failure");
          }

          req.session.user = {
            googleId: existingUser.googleId,
            displayName: existingUser.displayName,
          };

          console.log(
            "User already exists in the database:",
            existingUser.displayName
          );
        });
      }

      console.log("User added to session:", req.session.user);
      console.log("Session data:", req.session);
      return res.redirect("http://localhost:3000/chats");
    } catch (error) {
      console.error("Error during authentication:", error);
      return res.redirect("/auth/google/failure");
    }
  })(req, res, next);
};

export const handleLogout = (req: Request, res: Response) => {
  console.log("Logout route accessed");
  req.logout((err: any) => {
    if (err) {
      console.error("Error logging out:", err);
    }

    console.log("User has been logged out");
    req.session.destroy(err);
    console.log("Session has been destroyed");
  });

  res.send("Goodbye!");
};
