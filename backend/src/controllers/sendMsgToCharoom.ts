// import { Request, Response } from "express";
// import ChatMessage from "../models/chatroomModel"; // Import your ChatMessage model
// import { IUser } from "../models/userModel";
// import { getChatroomIo } from "../socketsChatroom"

// export const sendMessageToChatRoom = async (req: Request, res: Response) => {
//   console.log("sendMessageToChatRoom function is called");
//   try {
//     const recipientUserId = req.params.userId;
//     const { text } = req.body;

//     const user = req.user as IUser | undefined; // Use IUser and allow undefined

//     if (!user) {
//       return res.status(401).json({ error: "User not authenticated" });
//     }

//     // Create a new chat message
//     const newChatMessage = new ChatMessage({
//       recipientUser: recipientUserId,
//       author: user._id, // Automatically set the authenticated user's ID
//       text,
//     });

//     console.log("New chat message:", newChatMessage);

//     // Save the chat message to the chatRoom collection
//     await newChatMessage.save();

//     const chatroomIo = getChatroomIo(); // Use the chatroom-specific socket
//     chatroomIo.emit("new-ChatMessage", newChatMessage); // Emit the "new-ChatMessage"




//     return res.status(201).json(newChatMessage);
//   } catch (error) {
//     console.error("Error sending a message:", error);
//     return res.status(500).json({ error: "Internal server error" });
//   }
// };



// // no borrar hasta que funcione
//     // const io = getIo();
//     // io.emit("new-message", newChatMessage);



// import { Request, Response } from "express";
// import ChatMessage from "../models/chatroomModel"; // Import your ChatMessage model
// import { IUser } from "../models/userModel";
// import { getChatroomIo } from "../socketsChatroom"

// export const sendMessageToChatRoom = async (req: Request, res: Response) => {
//   console.log("sendMessageToChatRoom function is called");
//   try {
//     const recipientUserId = req.params.userId;
//     const { text } = req.body;

//     const user = req.user as IUser | undefined; // Use IUser and allow undefined

//     if (!user) {
//       return res.status(401).json({ error: "User not authenticated" });
//     }

//     // Create a new chat message
//     const newChatMessage = new ChatMessage({
//       recipientUser: recipientUserId,
//       author: user._id, // Automatically set the authenticated user's ID
//       text,
//     });

//     console.log("New chat message:", newChatMessage);

//     // Save the chat message to the chatRoom collection
//     await newChatMessage.save();

//     const chatroomIo = getChatroomIo(); // Use the chatroom-specific socket
//     chatroomIo.emit("new-ChatMessage", newChatMessage); // Emit the "new-ChatMessage"




//     return res.status(201).json(newChatMessage);
//   } catch (error) {
//     console.error("Error sending a message:", error);
//     return res.status(500).json({ error: "Internal server error" });
//   }
// };



// // no borrar hasta que funcione
//     // const io = getIo();
//     // io.emit("new-message", newChatMessage);


