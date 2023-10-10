const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;
require("dotenv").config();

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:8080/auth/google/callback",
      passReqToCallback: true,
    },
    function (request, accessToken, refreshToken, profile, done) {
      const user = {
        googleId: profile.id,
        displayName: profile.displayName,
        // Add other properties as needed
      };

      return done(null, user); // Ensure that the 'user' object matches your AuthenticatedUser interface
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});













// este funciona
// const passport = require("passport");
// const GoogleStrategy = require("passport-google-oauth2").Strategy;
// require("dotenv").config();

// const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
// const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: GOOGLE_CLIENT_ID,
//       clientSecret: GOOGLE_CLIENT_SECRET,
//       callbackURL: "http://localhost:8080/auth/google/callback",
//       passReqToCallback: true,
//     },
//     function (request, accessToken, refreshToken, profile, done) {
//       return done(null, profile); //  aqui se debe configurar para que funcione en la base de datos
//     }
//   )
// );

// passport.serializeUser(function (user, done) {
//   done(null, user);
// });

// passport.deserializeUser(function (user, done) {
//   done(null, user);
// });







// este lo propuso gpt pero o tiene mucho sentido
// const passport = require("passport");
// const GoogleStrategy = require("passport-google-oauth2").Strategy;
// const { User } = require("../models/messageModel")
// require("dotenv").config();

// const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
// const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: GOOGLE_CLIENT_ID,
//       clientSecret: GOOGLE_CLIENT_SECRET,
//       callbackURL: "http://localhost:8080/auth/google/callback",
//       passReqToCallback: true,
//     },
//     async function (request, accessToken, refreshToken, profile, done) {
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
//         return done(error, null);
//       }
//     }
//   )
// );
