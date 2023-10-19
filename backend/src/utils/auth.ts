// // este tiene solo un error

// import passport from "passport";
// import passportGoogle from "passport-google-oauth20";
// import { Profile } from "passport-google-oauth20";
// import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from "../utils/secrets";
// const GoogleStrategy = passportGoogle.Strategy;
// import dotenv from "dotenv";
// import User from "../models/userModel"; // Import your User model from the appropriate location

// dotenv.config();

// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: GOOGLE_CLIENT_ID,
//       clientSecret: GOOGLE_CLIENT_SECRET,
//       callbackURL: "http://localhost:8080/auth/google/callback",
//       passReqToCallback: true,
//     },
//     async (
//       request: any,
//       accessToken: string,
//       refreshToken: string,
//       profile: Profile,
//       done: (error: Error | null, user?: User | false | null) => void
//     ) => {
//       try {
//         // Check if the user already exists in the database
//         const existingUser = await User.findOne({ googleId: profile.id });

//         if (existingUser) {
//           // User already exists, return the existing user
//           return done(null, existingUser);
//         }

//         // User does not exist, create a new user document
//         const newUser = new User({
//           googleId: profile.id,
//           name: profile.displayName,
//           // Add other fields as needed
//         });

//         // Save the new user to the database
//         await newUser.save();

//         // Return the newly created user
//         return done(null, newUser);
//       } catch (error) {
//         // Handle any errors
//         return done(error as Error, null);
//       }
//     }
//   )
// );

// passport.serializeUser((user, done) => {
//   done(null, user);
// });

// passport.deserializeUser(async (id, done) => {
//   try {
//     const user = await User.findById(id);
//     done(null, user);
//   } catch (error) {
//     done(error as Error, null);
//   }
// });

// export default passport;





// // import passport from "passport";
// // import passportGoogle from "passport-google-oauth20";
// // import { Profile } from "passport-google-oauth20";
// // import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from "../utils/secrets";
// // const GoogleStrategy = passportGoogle.Strategy;
// // import dotenv from "dotenv";
// // import User, { IUser } from "../models/userModel"

// // //import User from "../models/userModel"; // Import your User model from the appropriate location

// // dotenv.config();

// // passport.use(
// //   new GoogleStrategy(
// //     {
// //       clientID: GOOGLE_CLIENT_ID,
// //       clientSecret: GOOGLE_CLIENT_SECRET,
// //       callbackURL: "http://localhost:8080/auth/google/callback",
// //       passReqToCallback: true,
// //     },
// //     async (
// //       request: any,
// //       accessToken: string,
// //       refreshToken: string,
// //       profile: Profile,
// //       done: (error: Error | null, user?: IUser | false | null) => void
// //     ) => {
// //       try {
// //         // ... Authentication logic ...
// //       } catch (error) {
// //         // ... Error handling ...
// //       }
// //     }
// //   )
// // );

// // passport.serializeUser((user, done) => {
// //   done(null, user);
// // });

// // passport.deserializeUser(async (id, done) => {
// //   try {
// //     const user = await User.findById(id);
// //     done(null, user);
// //   } catch (error) {
// //     done(error as Error, null);
// //   }
// // });

// // export default passport;





// // import passport from "passport";
// // import passportGoogle from "passport-google-oauth20";
// // import { Profile } from "passport-google-oauth20";
// // import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from "../utils/secrets";
// // const GoogleStrategy = passportGoogle.Strategy;
// // import dotenv from "dotenv";
// // import User from "../models/userModel"; // Import your User model from the appropriate location

// // dotenv.config();

// // passport.use(
// //   new GoogleStrategy(
// //     {
// //       clientID: GOOGLE_CLIENT_ID,
// //       clientSecret: GOOGLE_CLIENT_SECRET,
// //       callbackURL: "http://localhost:8080/auth/google/callback",
// //       passReqToCallback: true,
// //     },
// //     async (
// //       request: any,
// //       accessToken: string,
// //       refreshToken: string,
// //       profile: Profile,
// //       done: (error: Error | null, user?: User | false | null) => void
// //     ) => {
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
// //         return done(error as Error, null);
// //       }
// //     }
// //   )
// // );

// // passport.serializeUser((user, done) => {
// //   done(null, user);
// // });

// // passport.deserializeUser(async (id, done) => {
// //   try {
// //     const user = await User.findById(id);
// //     done(null, user);
// //   } catch (error) {
// //     done(error as Error, null);
// //   }
// // });

// // export default passport;

























// // import passport from "passport";
// // import passportGoogle from "passport-google-oauth20";
// // import { Profile } from "passport-google-oauth20"; // Import the 'Profile' type
// // import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from "../utils/secrets";
// // const GoogleStrategy = passportGoogle.Strategy;

// // import dotenv from "dotenv";

// // dotenv.config();

// // passport.use(
// //   new GoogleStrategy(
// //     {
// //       clientID: GOOGLE_CLIENT_ID,
// //       clientSecret: GOOGLE_CLIENT_SECRET,
// //       callbackURL: "http://localhost:8080/auth/google/callback",
// //       passReqToCallback: true,
// //     },
// //     async (request: any, accessToken: string, refreshToken: string, profile: Profile, done: (error: Error | null, user?: false | any) => void) => {
// //         try {
// //           // Your strategy implementation...

// //           // To indicate success without a user object, you can use 'false'
// //           return done(null, false);
// //         } catch (error) {
// //           return done(error, null);
// //         }
// //       }

// //   )
// // );

// // passport.serializeUser((user, done) => {
// //   done(null, user);
// // });

// // passport.deserializeUser((user, done) => {
// //   done(null, user);
// // });

// // export default passport;
