// declare module 'passport-google-oauth20' {
//     import { Strategy as PassportStrategy } from 'passport';
  
//     interface GoogleProfile {
//       // Define the properties you expect in a Google profile
//       // For example:
//       id: string;
//       displayName: string;
//       // Add more properties as needed
//     }
  
//     interface GoogleStrategyOptions {
//       clientID: string;
//       clientSecret: string;
//       callbackURL: string;
//       passReqToCallback: boolean;
//     }
  
//     type VerifyFunction = (request: any, accessToken: string, refreshToken: string, profile: GoogleProfile, done: (error: any, user?: any) => void);
  
//     class Strategy extends PassportStrategy {
//       constructor(options: GoogleStrategyOptions, verify: VerifyFunction);
//     }
//   }
  
//   declare module 'passport' {
//     import { Request } from 'express';
  
//     interface AuthenticateOptions {
//       callbackURL: string;
//       scope: string[];
//     }
  
//     interface Profile {
//       // Define the properties you expect in a user profile
//       // For example:
//       id: string;
//       displayName: string;
//       // Add more properties as needed
//     }
  
//     interface Request {
//       user?: any;
//     }
//   }
  