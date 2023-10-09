// src/routes/routes.ts

import express from "express";
import * as authController from "../controllers/authController";
import * as userController from "../controllers/userController";

const router = express.Router();

router.get("/auth/google", authController.authenticateGoogle);
// use this route to login: localhost:8080/auth/google

router.get("/auth/google/callback", authController.handleGoogleCallback);

router.get("/protected", authController.handleProtectedRoute);

router.get("/logout", authController.handleLogout);

router.get("/auth/google/failure", authController.handleGoogleFailure);

// Protected routes
router.get("/chat", authController.isLoggedIn, userController.getChatPage); // Route to display chat page
router.get("/api/messages", authController.isLoggedIn, userController.getMessages); // Route to get messages
router.post("/api/messages", authController.isLoggedIn, userController.sendMessage); // Route to send a message





export default router;




// alright! this works! now is time to define my database model or schema and set upt the configuration for connecting with mongodb. this is where my app necessary information will be stored. 



// este router funciona bien
// src/routes/routes.ts
// import express, { Request, Response, NextFunction } from "express";
// import passport from "passport";
// import session from "express-session";

// const router = express.Router();

// function isLoggedIn(req: Request, res: Response, next: NextFunction) {
//     (req as Request).user ? next() : res.sendStatus(401);
//   }

// // Define your routes here
// router.get("/", (req, res) => {
//   res.send('<a href="/auth/google">Authenticate with Google</a>');
// });

// router.get(
//   "/auth/google",
//   passport.authenticate("google", { scope: ["email", "profile"] })
// );

// router.get(
//   "/auth/google/callback",
//   passport.authenticate("google", {
//     successRedirect: "/protected",
//     failureRedirect: "/auth/google/failure",
//   })
// );

// router.get("/protected", isLoggedIn, (req, res) => {
//   res.send(`Hello`);
// });

// router.get("/logout", (req, res) => {
//   req.logout((err: any) => {
//     if (err) {
//       console.error("Error logging out:", err);
//     }
//   });
//   req.session.destroy(session);
//   res.send("Goodbye!");
// });

// router.get("/auth/google/failure", (req, res) => {
//   res.send("Failed to authenticate..");
// });

// export default router;
