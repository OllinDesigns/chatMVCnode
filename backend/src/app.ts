import express from "express";
import session from "express-session";
import passport from "passport";
import http from "http";
import router from "./routes/routes";
import { db } from "../database/db";
import cors from "cors";
import { Server } from "socket.io";

import "./utils/auth";

db();

const app = express();
const server = http.createServer(app);

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

const io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("new-message", (message) => {
    console.log("New message received in backend:", message);

    io.emit("new-message", message);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

server.listen(8080, () => {
  console.log("Listening on port: 8080");
});
