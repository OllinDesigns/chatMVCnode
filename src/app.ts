import express from "express";
import session from "express-session";
import passport from "passport";
import http from "http";
import router from "./routes/routes";
import { db } from "../database/db";
import cors from "cors";
import { initSocket } from "./sockets"

import "./utils/auth";

db();

const app = express();
const server = http.createServer(app);
initSocket(server)

app.use(express.static("public"));
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  session({
    secret: "cats",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/", router);



server.listen(8080, () => {
  console.log("Listening on port: 8080");
});
























// import express from "express";
// import session from "express-session";
// import passport from "passport";
// import http from "http";
// import { Server } from "socket.io";
// // import socketIo, { Server } from "socket.io";
// import router from "./routes/routes";
// import { db } from "../database/db";
// import cors from "cors";

// import "./utils/auth";

// db();

// const app = express();
// const server = http.createServer(app);
// export const io = new Server(server);
// // const io = socketIo(server);

// app.use(express.static('public'));

// app.use(cors({ origin: "*" }));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

// app.use(
//   session({
//     secret: "cats",
//     resave: false,
//     saveUninitialized: true,
//   })
// );

// app.use(passport.initialize());
// app.use(passport.session());

// app.use("/", router);

// const messages: any[] = [
//   {
//     // text: "Hola soy un mensaje",
//     // author: "Carlos Azaustre"
//     recipientUser: "6526e63b0133540688001e69",
//     author: "6526e57b0133540688001e65",
//     text: "gurruscus668",
//   },
// ]; // Replace 'any' with the actual type of your messages

// // Send 'messages' event to the client when they connect
// io.on("connection", (socket) => {
//   console.log("A user connected with sockets");
//   // en el servidor debes escuchar que se inicia la conexion

//   // Send the 'messages' event to the connected client
//   // emitir mensajes con un evento
//   socket.emit('messages', messages);

//   // Listen for 'new-message' event from the client
//   // escuchar en el socket del servidor si ha llegado un nuevo mensaje
//   // escuchar cunado recibimos un nuevo mensaje
//   socket.on('new-message', (data: any) => { // Replace 'any' with the actual type of your data
//     messages.push(data);

//     // Broadcast 'messages' event to all connected clients
//     io.sockets.emit('messages', messages);
//   });

//   // Handle WebSocket disconnect
//   socket.on("disconnect", () => {
//     console.log("User disconnected");
//   });
// });

// // io.on("connection", (socket) => {
// //   console.log("A user connected with sockets");

// //   // Handle WebSocket events here

// //   socket.on("disconnect", () => {
// //     console.log("User disconnected");
// //   });
// // });

// server.listen(8080, () => {
//   console.log("Listening on port: 8080");
// });

// import express from "express";
// import session from "express-session";
// import passport from "passport";
// import http from "http";
// // import { Server } from "socket.io";
// import router from "./routes/routes";
// import { db } from "../database/db";
// import cors from "cors";
// // import Message from "./models/messageModel";
// // import { IMessage } from "./models/messageModel";
// import { initSocket } from "./sockets";

// import "./utils/auth";

// db();

// const app = express();
// export const server = http.createServer(app);
// initSocket(server);

// // export const io = new Server(server);

// app.use(express.static('public'));
// app.use(cors({ origin: "*" }));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

// app.use(
//   session({
//     secret: "cats",
//     resave: false,
//     saveUninitialized: true,
//   })
// );

// app.use(passport.initialize());
// app.use(passport.session());

// app.use("/", router);

// // // todo lo de sockets comentado por si funciona
// // // Send 'messages' event to the client when they connect
// // io.on("connection", (socket) => {
// //   console.log("A user connected with sockets");

// //   // Retrieve messages from the database
// // // Retrieve messages from the database
// // Message.find({})
// //   .exec()
// //   .then((messages) => {
// //     // Emit the messages to the connected client
// //     socket.emit('messages', messages);
// //   })
// //   .catch((err) => {
// //     console.error("Error retrieving messages:", err);
// //   });

// // // Listen for 'new-message' event from the client
// // socket.on('new-message', async (data: IMessage) => {
// //   try {
// //     const newMessage = new Message(data);
// //     const savedMessage = await newMessage.save();

// //     // Emit the newly saved message to all connected clients
// //     io.sockets.emit('new-message', savedMessage);
// //   } catch (err) {
// //     console.error("Error saving message:", err);
// //   }
// // });

// //   // Handle WebSocket disconnect
// //   socket.on("disconnect", () => {
// //     console.log("User disconnected");
// //   });
// // });

// server.listen(8080, () => {
//   console.log("Listening on port: 8080");
// });



