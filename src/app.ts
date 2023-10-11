import express from "express";
import session from "express-session";
import passport from "passport";
import router from "./routes/routes";
import { db } from "../database/db";
import cors from "cors"


// Import your authentication configuration (Passport.js setup)
import "./utils/auth";

// Initialize the database connection
db();

const app = express();

// Enable CORS
app.use(cors({ origin: "*" }));

// Parse JSON and URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Session management
app.use(
  session({
    secret: "cats",
    resave: false,
    saveUninitialized: true,
  })
);

// Initialize Passport.js for authentication
app.use(passport.initialize());
app.use(passport.session());

// Use the defined routes
app.use("/", router);

app.listen(8080, () => console.log("Listening on port: 8080"));




// esta funciona, es antes de hacer la http request
// import express from "express";
// import session from "express-session";
// import passport from "passport";
// import router from "./routes/routes";
// import { db } from "../database/db";
// import cors from "cors"

// require("./utils/auth.js");



// db();

// const app = express();

// app.use(cors());

// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

// app.use(session({ secret: "cats", resave: false, saveUninitialized: true }));
// app.use(passport.initialize());
// app.use(passport.session());

// app.use("/", router);

// app.listen(8080, () => console.log("listening on port: 8080"));




// este funciona, es el sample inicial
// import express, { Request, Response, NextFunction } from "express";
// import session from "express-session";
// import passport from "passport";
// // import passport from "./auth"
// // import auth from "./"

// require("./utils/auth.js");

// const app = express();

// function isLoggedIn(req: Request, res: Response, next: NextFunction) {
//   (req as Request).user ? next() : res.sendStatus(401);
// }

// app.use(session({ secret: "cats", resave: false, saveUninitialized: true }));
// app.use(passport.initialize());
// app.use(passport.session());

// app.get("/", (req: Request, res: Response) => {
//   res.send('<a href="/auth/google">Authenticate with Google</a>');
// });

// app.get(
//   "/auth/google",
//   passport.authenticate("google", { scope: ["email", "profile"] })
// );

// app.get(
//   "/auth/google/callback",
//   passport.authenticate("google", {
//     successRedirect: "/protected",
//     failureRedirect: "/auth/google/failure",
//   })
// );

// app.get("/protected", isLoggedIn, (req: Request, res: Response) => {
//   res.send(`Hello`);
// });

// app.get("/logout", (req: Request, res: Response) => {
//   req.logout((err: any) => {
//     if (err) {
//       console.error("Error logging out:", err);
//     }
//   });
//   req.session.destroy(session);
//   res.send("Goodbye!");
// });

// app.get("/auth/google/failure", (req: Request, res: Response) => {
//   res.send("Failed to authenticate..");
// });

// app.listen(, () => console.log("listening on port: 8080"));
