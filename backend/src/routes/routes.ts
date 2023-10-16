// localhost:8080/auth/google

import express from "express";
import * as authController from "../controllers/authController";
import * as userController from "../controllers/userController";
import * as messageController from "../controllers/messageController";
// import * as sendMsgToCharoom from "../controllers/sendMsgToCharoom"

const router = express.Router();

router.get("/auth/google", authController.authenticateGoogle);
// use this route to login: localhost:8080/auth/google
// This route is essential for my project

router.get("/auth/google/callback", authController.handleGoogleCallback);
// resul of the route with authenticated user: Access blocked: authorisation error: Missing required parameter: scope: Error 400: invalid_request
// resul of the route with non-authenticated user: does nor work: Error 400: invalid_request
// I think this route is essential for my project

router.get("/auth/google/success", authController.handleGoogleSuccess);

// resul of the route with authenticated user: it works! shows the json message
// resul of the route with non-authenticated user: does not work: error	"User not authenticated"
// route necessary for my project. Is logic and implementation has to be changed


router.get("/logout", authController.handleLogout);
// resul of the route with authenticated user: it works: goodbye!
// resul of the route with non-authenticated user: it works. it says goodbye
// This route fails in its implementation. I must define a logout function that actually logs out.


// PROTECTED ROUTES


router.get("/chat", authController.isLoggedIn, userController.getChatPage); // Route to display chat page
// resul of the route with authenticated user: it works!, it displays the chat page
// resul of the route with non-authenticated user: doesnt work: Unauthorized
// route created for testing purposes.

// Add a new route to get all users
router.get("/api/users", authController.isLoggedIn, userController.getAllUsers);
// resul of the route with authenticated user: it works!, it shows the users from the database
// resul of the route with non-authenticated user: doesnt work. the route is private now
// route necessary for my project.

// Add a new route to get all messages
router.get("/api/messages", authController.isLoggedIn, messageController.getMessages);


// Route to send a message
// router.post(
//   "/api/messages/:userId",
//   authController.isLoggedIn,
//   messageController.sendMessage, 
  
// );


// // NO BORRAR, ESTA ES LA DE PRIVATEMESSAGE
// router.post(
//   "/api/messages1/:userId",
//   authController.isLoggedIn,
//   messageController.sendMessage1, 
  
// );


//l la nueva
router.post(
  "/api/messagesToChatroom",
  authController.isLoggedIn,
  messageController.sendMessage1, 
  
);


// router.post(
//   "/api/chatroom/messages/:userId",
//   authController.isLoggedIn,
//   sendMsgToCharoom.sendMessageToChatRoom
// );


// this route doesnt work, perhaps because the message receptor user does not have an active session
// route necessary for my project

// router.post(
//   "/api/chatroom/messages/:userId",
//   authController.isLoggedIn, // Ensure the user is authenticated
//   sendMessageToChatroom2.sendMessageToChatroom, // Use the sendMessageToChatroom function
// );
// this route doesnt work, perhaps because the message receptor user does not have an active session
// route necessary for my project

export default router;












// a considerar

// router.get("/api/messages", authController.isLoggedIn, userController.getMessages); // Route to get messages
