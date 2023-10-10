// este funciona pero no agrega a la base de datos// src/controllers/authController.ts
import session from "express-session";
import { Request, Response, NextFunction } from "express";
import passport from "passport";
import * as userController from "../controllers/userController";
import { IUser } from "src/models/userModel";

declare module "express-session" {
  interface Session {
    user: AuthenticatedUser | undefined;
  }
}

// Middleware to check if the user is authenticated
export const isLoggedIn = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) {
    return next();
  }

  // If not authenticated, send a 401 Unauthorized status
  res.sendStatus(401);
};

export const authenticateGoogle = passport.authenticate("google", {
  scope: ["email", "profile"],
});


export const handleGoogleCallback = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  passport.authenticate("google", async (err: any, user: IUser, info: any) => {
    if (err) {
      // Handle authentication error
      console.error("Authentication error:", err);
      return res.redirect("/auth/google/failure");
    }

    if (!user) {
      // Handle failed authentication
      console.error("Authentication failed.");
      return res.redirect("/auth/google/failure");
    }

    try {
      // Insert the user into the database immediately after successful authentication
      await userController.createUserFromOAuth({
        googleId: user.googleId,
        displayName: user.displayName,
      });

      // Store the user data in the session
      req.session.user = {
        googleId: user.googleId,
        displayName: user.displayName,
        // Add other properties as needed
      };

      console.log("user added to session:", req.session.user);

      // Redirect to a success page or route
      return res.redirect("/auth/google/success");
    } catch (error) {
      console.error("Error inserting user into the database:", error);
      // Redirect to a failure page or route
      return res.redirect("/auth/google/failure");
    }
  })(req, res, next);
};


// Add a new route to print user information
export const printUserInfo = (req: Request, res: Response) => {
  // Access the authenticated user's information from req.user
  const user = req.user;

  if (user) {
    // Print user information
    console.log("Authenticated User:", user);
    res.status(200).json(user); // Respond with the user information
  } else {
    // User is not authenticated
    res.status(401).json({ error: "Not authenticated" });
  }
};

interface AuthenticatedUser {
  googleId: string;
  displayName: string;
  // Add other properties as needed
}

export const createOrUpdateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Access the authenticated user's profile from the session
    const user = req.session.user as AuthenticatedUser;

    if (!user) {
      // Handle the case when the user is not in the session (e.g., throw an error)
      throw new Error("User not found in session");
    }

    // Call the createUserFromOAuth function with user data
    const createdUser = await userController.createUserFromOAuth(user);

    // Set the user in the session if needed
    req.session.user = createdUser;

    // Redirect or handle the next step as needed
    res.redirect("/chat"); // Redirect to the chat page or another route
  } catch (error) {
    console.error("Error creating/updating user profile:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const handleProtectedRoute = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.send(`Hello`);
};

export const handleLogout = (req: Request, res: Response) => {
  req.logout((err: any) => {
    if (err) {
      console.error("Error logging out:", err);
    }
  });
  req.session.destroy(session);
  res.send("Goodbye!");
};

export const handleGoogleFailure = (req: Request, res: Response) => {
  res.send("Failed to authenticate..");
};

// export const handleGoogleCallback = (req: Request, res: Response, next: NextFunction) => {
//   passport.authenticate("google", async (err: any, user: IUser, info: any) => {
//     if (err) {
//       // Handle authentication error
//       return res.redirect("/auth/google/failure");
//     }

//     if (!user) {
//       // Handle failed authentication
//       return res.redirect("/auth/google/failure");
//     }

//     try {
//       // Store the user data in the session
//       req.session.user = {
//         googleId: user.googleId,
//         displayName: user.displayName,
//         // Add other properties as needed
//       };

//       console.log('user added to session:', req.session.user);

//       // Use the createUser function from userController to insert the authenticated user into the database
//       await userController.createUser(req, res);

//       // Redirect to a success page or route
//       return res.redirect("/auth/google/success");

//     } catch (error) {
//       console.error("Error inserting user into the database:", error);
//       return res.redirect("/auth/google/failure");
//     }
//   })(req, res, next);
// };

// export const handleGoogleCallback = (req: Request, res: Response, next: NextFunction) => {
//   passport.authenticate("google", async (err: any, user: IUser, info: any) => {
//     if (err) {
//       // Handle authentication error
//       return res.redirect("/auth/google/failure");
//     }

//     if (!user) {
//       // Handle failed authentication
//       return res.redirect("/auth/google/failure");
//     }

//     try {
//       // Use the createUser function from userController to insert the authenticated user into the database
//       await userController.createUser(req, res);

//       console.log('user added to database')

//       // Redirect to a success page or route
//       return res.redirect("/auth/google/success");

//     } catch (error) {
//       console.error("Error inserting user into the database:", error);
//       return res.redirect("/auth/google/failure");
//     }
//   })(req, res, next);
// };

// esta funciona
// export const handleGoogleCallback = passport.authenticate("google", {
//   successRedirect: "/chat", // Redirect to the chat page on successful authentication
//   failureRedirect: "/auth/google/failure",
// });

// esta es la actual, funciona
// export const handleGoogleCallback = passport.authenticate("google", {
//   successRedirect: "/chat",
//   failureRedirect: "/auth/google/failure",
// });

// esta es la nueva funcion

// este funciona // src/controllers/authController.ts
// import session from "express-session";
// import { Request, Response, NextFunction } from "express";
// import passport from "passport";

// export const authenticateGoogle = passport.authenticate("google", {
//   scope: ["email", "profile"],
// });

// export const handleGoogleCallback = passport.authenticate("google", {
//   successRedirect: "/protected",
//   failureRedirect: "/auth/google/failure",
// });

// export const handleProtectedRoute = (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   res.send(`Hello`);
// };

// export const handleLogout = (req: Request, res: Response) => {
//   req.logout((err: any) => {
//     if (err) {
//       console.error("Error logging out:", err);
//     }
//   });
//   req.session.destroy(session);
//   res.send("Goodbye!");
// };

// export const handleGoogleFailure = (req: Request, res: Response) => {
//   res.send("Failed to authenticate..");
// };

// // este funciona pero no crea el usuario google src/controllers/authController.ts
// import session from "express-session";
// import { Request, Response, NextFunction } from "express";
// import passport from "passport";

// // Middleware to check if the user is authenticated
// export const isLoggedIn = (req: Request, res: Response, next: NextFunction) => {
//   if (req.isAuthenticated()) {
//     // If authenticated, continue to the next middleware
//     return next();
//   }

//   // If not authenticated, send a 401 Unauthorized status
//   res.sendStatus(401);
// };

// export const authenticateGoogle = passport.authenticate("google", {
//   scope: ["email", "profile"],
// });

// export const handleGoogleCallback = passport.authenticate("google", {
//   successRedirect: "/chat",
//   failureRedirect: "/auth/google/failure",
// });

// export const handleProtectedRoute = (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   res.send(`Hello`);
// };

// export const handleLogout = (req: Request, res: Response) => {
//   req.logout((err: any) => {
//     if (err) {
//       console.error("Error logging out:", err);
//     }
//   });
//   req.session.destroy(session);
//   res.send("Goodbye!");
// };

// export const handleGoogleFailure = (req: Request, res: Response) => {
//   res.send("Failed to authenticate..");
// };

// // esta es la ultima version propuesta por gpt que no funciona
// // import passport from "passport";
// // import passportGoogle from "passport-google-oauth20";
// // import session from "express-session";
// // import { Request, Response, NextFunction } from "express";
// // import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from "../utils/secrets";
// // import User, { IUser } from "../models/userModel"; // Import your User model from the appropriate location
// // const GoogleStrategy = passportGoogle.Strategy;
// // require("dotenv").config();

// // // Middleware to check if the user is authenticated
// // export const isLoggedIn = (
// //   req: Request,
// //   res: Response,
// //   next: NextFunction
// // ) => {
// //   if (req.isAuthenticated()) {
// //     // If authenticated, continue to the next middleware
// //     return next();
// //   }

// //   // If not authenticated, send a 401 Unauthorized status
// //   res.sendStatus(401);
// // };

// // passport.use(
// //   new GoogleStrategy(
// //     {
// //       clientID: GOOGLE_CLIENT_ID,
// //       clientSecret: GOOGLE_CLIENT_SECRET,
// //       callbackURL: "http://localhost:8080/auth/google/callback",
// //       passReqToCallback: true,
// //     },
// //     async function (
// //       request: Request,
// //       accessToken: string,
// //       refreshToken: string,
// //       profile: passportGoogle.Profile,
// //       done: passportGoogle.VerifyCallback
// //     ) {
// //       try {
// //         // Check if the user already exists in the database
// //         const existingUser = await User.findOne({ googleId: profile.id });

// //         if (existingUser) {
// //           // User already exists, return the existing user
// //           return done(null, existingUser);
// //         }

// //         // User does not exist, create a new user document
// //         const newUser = new User({
// //           googleId: profile.id,
// //           name: profile.displayName,
// //           // Add other fields as needed
// //         });

// //         // Save the new user to the database
// //         await newUser.save();

// //         // Return the newly created user
// //         return done(null, newUser);
// //       } catch (error) {
// //         // Handle any errors
// //         return done(error, null);
// //       }
// //     }
// //   )
// // );

// // passport.serializeUser(function (
// //   user: IUser,
// //   done: (err: any, id?: string | undefined) => void
// // ) {
// //   done(null, user.id);
// // });

// // passport.deserializeUser(async function (
// //   id: string,
// //   done: passportGoogle.VerifyCallback<IUser | null>
// // ) {
// //   try {
// //     const user = await User.findById(id);
// //     done(null, user || null);
// //   } catch (error) {
// //     done(error, null);
// //   }
// // });

// // // Rest of your authentication controller functions remain the same
// // export const authenticateGoogle = passport.authenticate("google", {
// //   scope: ["email", "profile"],
// // });

// // export const handleGoogleCallback = passport.authenticate("google", {
// //   successRedirect: "/chat",
// //   failureRedirect: "/auth/google/failure",
// // });

// // export const handleProtectedRoute = (
// //   req: Request,
// //   res: Response,
// //   next: NextFunction
// // ) => {
// //   res.send(`Hello`);
// // };

// // export const handleLogout = (req: Request, res: Response) => {
// //   req.logout();
// //   req.session?.destroy(() => {
// //     res.redirect("/");
// //   });
// // };

// // export const handleGoogleFailure = (req: Request, res: Response) => {
// //   res.send("Failed to authenticate..");
// // };

// // este funciona pero no crea el usuario google src/controllers/authController.ts
// // import session from "express-session";
// // import { Request, Response, NextFunction } from "express";
// // import passport from "passport";

// // // Middleware to check if the user is authenticated
// // export const isLoggedIn = (req: Request, res: Response, next: NextFunction) => {
// //   if (req.isAuthenticated()) {
// //     // If authenticated, continue to the next middleware
// //     return next();
// //   }

// //   // If not authenticated, send a 401 Unauthorized status
// //   res.sendStatus(401);
// // };

// // export const authenticateGoogle = passport.authenticate("google", {
// //   scope: ["email", "profile"],
// // });

// // export const handleGoogleCallback = passport.authenticate("google", {
// //   successRedirect: "/chat",
// //   failureRedirect: "/auth/google/failure",
// // });

// // export const handleProtectedRoute = (
// //   req: Request,
// //   res: Response,
// //   next: NextFunction
// // ) => {
// //   res.send(`Hello`);
// // };

// // export const handleLogout = (req: Request, res: Response) => {
// //   req.logout((err: any) => {
// //     if (err) {
// //       console.error("Error logging out:", err);
// //     }
// //   });
// //   req.session.destroy(session);
// //   res.send("Goodbye!");
// // };

// // export const handleGoogleFailure = (req: Request, res: Response) => {
// //   res.send("Failed to authenticate..");
// // };

// // este funciona // src/controllers/authController.ts
// // import session from "express-session";
// // import { Request, Response, NextFunction } from "express";
// // import passport from "passport";

// // export const authenticateGoogle = passport.authenticate("google", {
// //   scope: ["email", "profile"],
// // });

// // export const handleGoogleCallback = passport.authenticate("google", {
// //   successRedirect: "/protected",
// //   failureRedirect: "/auth/google/failure",
// // });

// // export const handleProtectedRoute = (
// //   req: Request,
// //   res: Response,
// //   next: NextFunction
// // ) => {
// //   res.send(`Hello`);
// // };

// // export const handleLogout = (req: Request, res: Response) => {
// //   req.logout((err: any) => {
// //     if (err) {
// //       console.error("Error logging out:", err);
// //     }
// //   });
// //   req.session.destroy(session);
// //   res.send("Goodbye!");
// // };

// // export const handleGoogleFailure = (req: Request, res: Response) => {
// //   res.send("Failed to authenticate..");
// // };

// well it seems that after all we have done is not possible to transform the src/utils/auth.js into a working typescript file. I think we should live my project as it was (with src/utils/auth.js) and think about another way to create the user after a succesful google-oauth authentification. How about if once the athentication process is done with a google account, I create a user of my chat through a post http request createUser? perhaps through the src/controllers/userController.ts
