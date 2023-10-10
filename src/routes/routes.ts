// localhost:8080/auth/google

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

router.get("/auth/printUserInfo", authController.printUserInfo);

router.get("/auth/google/success", (req, res) => {
  // Check if the user is authenticated and their information is in the session
  if (req.session.user) {
    const { googleId, displayName } = req.session.user;

    // Include the user's information in the success message
    res
      .status(200)
      .json({
        message: `Google authentication successful for ${displayName} (Google ID: ${googleId})`,
      });
  } else {
    // Handle the case where the user's information is not available
    res.status(401).json({ error: "User not authenticated" });
  }
});

router.get("/chat", authController.isLoggedIn, userController.getChatPage); // Route to display chat page
// router.get("/api/messages", authController.isLoggedIn, userController.getMessages); // Route to get messages
// router.post("/api/messages", authController.isLoggedIn, userController.sendMessage); // Route to send a message

export default router;









// funciones que no me dejan hacer el post request

// import express from "express";
// import * as authController from "../controllers/authController";
// import * as userController from "../controllers/userController";
// import { AuthenticatedUser } from "../controllers/userController";

// const router = express.Router();

// router.get("/auth/google", authController.authenticateGoogle);
// // use this route to login: localhost:8080/auth/google

// router.get("/auth/google/callback", authController.handleGoogleCallback);

// router.get("/protected", authController.handleProtectedRoute);

// router.get("/logout", authController.handleLogout);

// router.get("/auth/google/failure", authController.handleGoogleFailure);

// // Protected routes
// // Create a new route to create a user
// router.post("/api/createUser", authController.isLoggedIn, (req: Request & { user: AuthenticatedUser }, res: Response) => {
//     userController.createUser(req, res);
//   });

// router.get("/chat", authController.isLoggedIn, userController.getChatPage); // Route to display chat page
// router.get("/api/messages", authController.isLoggedIn, userController.getMessages); // Route to get messages
// router.post("/api/messages", authController.isLoggedIn, userController.sendMessage); // Route to send a message

// export default router;

// intento fallido usando un auth controller// src/routes/routes.ts

// import express from "express";
// // import * as authController from "../controllers/authController";
// import * as userController from "../controllers/userController";

// const router = express.Router();

// router.get("/auth/google", authController.authenticateGoogle);
// // use this route to login: localhost:8080/auth/google

// router.get("/auth/google/callback", authController.handleGoogleCallback);

// router.get("/protected", authController.handleProtectedRoute);

// router.get("/logout", authController.handleLogout);

// router.get("/auth/google/failure", authController.handleGoogleFailure);

// // Protected routes
// router.get("/chat", authController.isLoggedIn, userController.getChatPage); // Route to display chat page
// router.get("/api/messages", authController.isLoggedIn, userController.getMessages); // Route to get messages
// router.post("/api/messages", authController.isLoggedIn, userController.sendMessage); // Route to send a message

// export default router;
