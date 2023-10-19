import express from "express";
import * as authController from "../controllers/authController";
import * as userController from "../controllers/userController";
import * as messageController from "../controllers/messageController";

const router = express.Router();

// use this route to login: localhost:8080/auth/google
router.get("/auth/google", authController.authenticateGoogle);

router.get("/auth/google/callback", authController.handleGoogleCallback);

router.get("/logout", authController.handleLogout);

// PROTECTED ROUTES

router.get("/api/users", authController.isLoggedIn, userController.getAllUsers);

router.get(
  "/api/messages",
  authController.isLoggedIn,
  messageController.getMessages
);

router.post(
  "/api/messagesToChatroom",
  authController.isLoggedIn,
  messageController.sendMessage1
);

export default router;
