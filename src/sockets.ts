import { Server } from "socket.io";
import http from "http";
import Message from "./models/messageModel";

let io: Server;

export function initSocket(server: http.Server): void {
  io = new Server(server);

  io.on("connection", (socket) => {
    console.log("A user connected with sockets");
  
    // Retrieve messages from the database
    // Retrieve messages from the database
    Message.find({})
      .exec()
      .then((messages) => {
        // Emit the messages to the connected client
        socket.emit("messages", messages);
      })
      .catch((err) => {
        console.error("Error retrieving messages:", err);
      });
      
    // Listen for 'new-message' event from the client
    socket.on("new-message", async (data: any) => {
      try {
        const newMessage = new Message(data);
        const savedMessage = await newMessage.save();
  
        // Emit the newly saved message to all connected clients
        io.sockets.emit("new-message", savedMessage);
      } catch (err) {
        console.error("Error saving message:", err);
      }
    });



    // Handle WebSocket disconnect
    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });
}

export function getIo(): Server {
  return io;
}


























// // nuevo intento, no funciona
// socket.on("new-ChatMessage", async (data: any) => {
//   try {
//     const newChatMessage = new Message(data);
//     const savedMessage = await newChatMessage.save();

//     // Emit the newly saved message to all connected clients
//     io.sockets.emit("new-Chatmessage", savedMessage);
//   } catch (err) {
//     console.error("Error saving message:", err);
//   }
// });
