import { Request, Response, NextFunction } from "express";
import passport from "passport";
import * as userController from "../controllers/userController";
import { IUser } from "src/models/userModel";

interface AuthenticatedUser {
  googleId: string;
  displayName: string;
  // Add other properties as needed
}

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
      // Check if the user already exists in the database
      const existingUser = await userController.findUserByGoogleId(user.googleId);

      if (!existingUser) {
        // User doesn't exist, insert them into the database
        const createdUser = await userController.createUserFromOAuth({
          googleId: user.googleId,
          displayName: user.displayName,
        });

        // Store the user data in the session
        req.session.user = {
          googleId: createdUser.googleId,
          displayName: createdUser.displayName,
          // Add other properties as needed
        };

        console.log("User added to MongoDB:", createdUser.displayName);
      } else {
        // The user exists, open a passport session for them
        req.login(existingUser, (loginErr) => {
          if (loginErr) {
            console.error("Error opening passport session:", loginErr);
            return res.redirect("/auth/google/failure");
          }

          // Store the user data in the session
          req.session.user = {
            googleId: existingUser.googleId,
            displayName: existingUser.displayName,
            // Add other properties as needed
          };

          console.log("User already exists in the database:", existingUser.displayName);
        });
      }

      console.log("User added to session:", req.session.user);
      console.log("Session data:", req.session);
      return res.redirect("/auth/google/success");
    } catch (error) {
      console.error("Error during authentication:", error);
      return res.redirect("/auth/google/failure");
    }
  })(req, res, next);
};



// export const handleGoogleCallback = (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   passport.authenticate("google", async (err: any, user: IUser, info: any) => {
//     if (err) {
//       // Handle authentication error
//       console.error("Authentication error:", err);
//       return res.redirect("/auth/google/failure");
//     }

//     if (!user) {
//       // Handle failed authentication
//       console.error("Authentication failed.");
//       return res.redirect("/auth/google/failure");
//     }

//     try {
//       // Insert the user into the database immediately after successful authentication
//       await userController.createUserFromOAuth({
//         googleId: user.googleId,
//         displayName: user.displayName,
        
//       });

//       console.log("user added to MongoDB:", user.displayName);

//       // Store the user data in the session
//       req.session.user = {
//         googleId: user.googleId,
//         displayName: user.displayName,
//         // Add other properties as needed
//       };

//       console.log("user added to session:", req.session.user);

//       console.log("Session data:", req.session);
//       // Redirect to a success page or route
//       return res.redirect("/auth/google/success");
//     } catch (error) {
//       console.error("Error inserting user into the database:", error);
//       // Redirect to a failure page or route
//       return res.redirect("/auth/google/failure");
//     }
//   })(req, res, next);
// };

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
  res.send("Goodbye!");
};

export const handleGoogleFailure = (req: Request, res: Response) => {
  res.send("Failed to authenticate..");
};





// esta funcion no esta hacindo nada, puede ser util para despues
// export const createOrUpdateUser = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     // Access the authenticated user's profile from the session
//     const user = req.session.user as AuthenticatedUser;

//     if (!user) {
//       // Handle the case when the user is not in the session (e.g., throw an error)
//       throw new Error("User not found in session");
//     }

//     // Call the createUserFromOAuth function with user data
//     const createdUser = await userController.createUserFromOAuth(user);

//     // Set the user in the session if needed
//     req.session.user = createdUser;

//     console.log(`function createOrUpdateUser has been used for ${createdUser}`)

//     // Redirect or handle the next step as needed
//     res.redirect("/chat"); // Redirect to the chat page or another route
//   } catch (error) {
//     console.error("Error creating/updating user profile:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

// aqui debo mirar como se gestiona el logout
// export const handleLogout = (req: Request, res: Response) => {
//   req.logout((err: any) => {
//     if (err) {
//       console.error("Error logging out:", err);
//     }
//   });
//   req.session.destroy(session);
//   res.send("Goodbye!");
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

