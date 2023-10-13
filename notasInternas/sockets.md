Good morning. Today the first thing we will do is to implement the use of sockets interacting with my database. I want you to pay close attention: yesterday we did a simulation of the sockets and they work. When the application runs I have real time messages in my front-end. However, the code responsible for this behavior is located in my app.ts. There we have put an array of messages and then we have put sockets to interact with the front-end. First I am going to give you the files responsible for the real time messages for you to analyze them and then I will tell you what I want to do. these files are public/index.html, public/main.js and app.ts. wait for them

When a user connects to your server, the server sends the messages array to the client, and this array is rendered on the page.


instrucciones pal chat

You have described very well what happens and this is exactly what I want to change: I don't want to use this array in app.ts because I have put it there only to verify that the sockets work and that I have real time messages in the front-end.

What I want is that the messages that are stored in my mongodb database are the ones that can be seen in the front-end, so that when a user sends a message to another user, I can see them in the front-end. 
user sends a message to another, these can be seen in real time in the browser. How do I do this? Do you want my folder structure? Or what kind of files do you need to get what I want?



implementacion sockets en proyecto de galis

controller.ts

line 67, this function

xport const createMessage = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const user_id = req.params.user_id;
    const { text } = req.body;
    try {
        const newMessage = await userService.createMessage(text, user_id);

        io.emit("new-message", newMessage)

        return res.status(200).json(newMessage);
    } catch (err) {
        next(err);
    }
}

Server.ts

export const connectedClients = new Set<WebSocket>();

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
})

FRONT

MessageList.tsx


  useEffect(() => {
    getMessageList();
    const socket = io(`ws://localhost:${PORT}`);

    socket.on("new-message", (newMessage: IMessage) => {
      setMessageList((prevMessageList) => [...prevMessageList, newMessage]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);


  videos HINDU

  https://www.youtube.com/watch?v=3wi_fScbF1Y&list=PLKhlp2qtUcSZsGkxAdgnPcHioRr-4guZf&index=6


vistos ={
Defining Schema and Models with mongoose - MERN Stack Chat App with Socket.IO #6

}

viendo este: real-time Messages with Socket.IO and React JS - MERN Stack Chat App with Socket.IO #15