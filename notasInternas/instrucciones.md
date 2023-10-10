# Chat

Instructions

Let's build a Chat!!!

We will need socket.io, a JavaScript library for real-time web applications. It allows real-time two-way communication between clients and web servers. It has two parts: a client-side library that runs in the browser and a server-side library for Node.js.

- Level 1

Create an application that displays a login page where the user can enter a chat room (client and server must be completely separate). By opening the same URL in another browser window, we can log in with another user. Verify that they are in the same room and allow them to chat. Add the ability to create multiple chat rooms and manage persistence with MongoDB (with Mongoose) or MySQL (with Sequelize).

- Level 2

Add authentication using Google Token (google-auth-library)

- Level 3

To overcome this level you can add different options:

     Add any functionality you find useful.
     Add the frontend customization you want.
     Create the frontend with some framework (React, Vue, Angular).
     Make the project using TypeScript.


     User Creation: You mentioned using the userController to create a user. This can be done after successful authentication. The user data can be extracted from the authentication result (e.g., from the Google OAuth profile) and passed to the userController to create a user in your database.