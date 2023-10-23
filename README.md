# chatMVCnode
I present a REST API application, made in NodeJS, Typescript and React. It is a chat where users receive real-time messages thanks to the socket.io library. To use it, you need a Google account, because the user creation and authentication is managed through the Passport strategy for Google OAuth 2.0. You also need access to MongoDB as the application connects to that database. I recommend a MongoDB Atlas account, which generates a connection string for you.


## let's get started

- This application was developed using the Yarn package manager. The application listens on port 8080 on its backend and on port 3000 on its frontend.

1. Clone the repository to your local machine.


2. In the root folder there are 2 folders: frontend and backend. Start by installing the backend. Open that folder and type the following command

   ```bash
   yarn install

3. Now configure MongoDB with dot.env

### MongoDb

The file backend/database/db.ts is responsible for the connection settings to the database. It uses an .env file to protect the connection string of every user. It works as follows:

### set up .env

Create a file .env in the root directory. The contens should be only this.

MONGO_CONNECTION_STRING=mongodb+srv://(yourMongoDBAtlasUserName):(yourMongoDbAtlasPassword).1b2ylxi.mongodb.net/(nameOfYourCollection)?retryWrites=true&w=majority.

Replace yourMongoDBAtlasUserName with your MongoDB Atlas user name, delete the parenthesis.

Replace yourMongoDbAtlasPassword with your MongoDB Atlas password, delete the parenthesis.

Replace nameOfYourCollection with the name you want to give to this collection. This is very important to locate and handle your connection in Atlas. Delete the parenthesis.

You can do this by going into your Atlas User home page. Then choose a Cluster. Then click on Connect (beside the chosen cluster). Then choose connect to your application, Driver: Node.js. MongoDB proposes a connection string that should be modified with the things mentioned above.

If everything works correctly, you will see your chosen collection name under your chosen Cluster when you click "Browse collections". 

4. For the application to run you must write one of these scripts

   ```bash
   yarn start   //  yarn run dev

The application is running. You will see the logs in the console 
Listening on port: 8080
Connected to MongoDB

5. Now open the frontend folder and write

   ```bash
   yarn start

- The React application is generated and directs you to the chat login. There, you must authenticate using your Google account. Once your authentication has been successful you will be redirected to the Chatroom, where you can chat with several users.

5. Test with Jest: go to backend folder and type:

   ```bash
   yarn start