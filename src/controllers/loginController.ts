// src/controllers/authController.ts
import session from "express-session";
import { Request, Response, NextFunction } from "express";
import passport from "passport";

export const authenticateGoogle = passport.authenticate("google", {
  scope: ["email", "profile"],
});

export const handleGoogleCallback = passport.authenticate("google", {
  successRedirect: "/protected",
  failureRedirect: "/auth/google/failure",
});

export const handleProtectedRoute = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.send(`Hello`);
};

export const handleLogout = (req: Request, res: Response) => {
  req.logout((err: any) => {
    if (err) {
      console.error("Error logging out:", err);
    }
  });
  req.session.destroy(session);
  res.send("Goodbye!");
};

export const handleGoogleFailure = (req: Request, res: Response) => {
  res.send("Failed to authenticate..");
};
