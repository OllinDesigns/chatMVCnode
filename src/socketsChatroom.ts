// import { Server } from "socket.io";
// import http from "http";
// import ChatMessage from "./models/chatroomModel"; // Import your ChatMessage model

// let chatroomIo: Server;

// export function initChatroomSocket(server: http.Server): void {
//   chatroomIo = new Server(server);

//   chatroomIo.on("connection", (socket) => {
//     console.log("A user connected to the chatroom");

//     // Retrieve chat messages from the database
//     ChatMessage.find({})
//       .exec()
//       .then((chatMessages) => {
//         // Emit chat messages to the connected client
//         socket.emit("chat-messages", chatMessages);
//       })
//       .catch((err) => {
//         console.error("Error retrieving chat messages:", err);
//       });

//     // Listen for 'new-ChatMessage' event from the client
//     socket.on("new-ChatMessage", async (data: any) => {
//       try {
//         const newChatMessage = new ChatMessage(data);
//         const savedChatMessage = await newChatMessage.save();

//         // Emit the newly saved chat message to all connected clients
//         chatroomIo.sockets.emit("new-ChatMessage", savedChatMessage);
//       } catch (err) {
//         console.error("Error saving chat message:", err);
//       }
//     });

//     // Handle WebSocket disconnect
//     socket.on("disconnect", () => {
//       console.log("User disconnected from the chatroom");
//     });
//   });
// }

// export function getChatroomIo(): Server {
//   return chatroomIo;
// }
