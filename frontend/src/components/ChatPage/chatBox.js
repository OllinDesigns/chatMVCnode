import React, { useEffect, useState } from "react";
import axios from "axios";
import { FormControl } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Box, Stack, Text } from "@chakra-ui/layout";
import io from "socket.io-client";

const ENDPOINT = "http://localhost:8080";
let socket = io.connect("http://localhost:8080", {
  forceNew: true,
});

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [typing, setTyping] = useState(false);

  const fetchMessages = async () => {
    const { data } = await axios.get("/api/messages");

    setMessages(data);
  };

  const sendMessage = async (event) => {
    if (event.key === "Enter" && newMessage) {
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };

        setNewMessage("");

        const { data } = await axios.post(
          "/api/messagesToChatroom",
          {
            text: newMessage,
          },
          config
        );

        console.log(data);

        console.log("Message sent to server:", data); // Log before emitting
        socket.emit("new-message", data);
        console.log("Socket emit sent:", data); // Log after emitting
        setMessages([...messages, data]);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    socket = io(ENDPOINT);
  }, []);

  useEffect(() => {
    fetchMessages();
  });

  useEffect(() => {
    socket.on("new-message", (newMessage) => {
      console.log(`from chatbox.js ${newMessage}`);
      setMessages([...messages, newMessage]);
    });
  });

  const typingHandler = (e) => {
    setNewMessage(e.target.value);

    if (!typing) {
      setTyping(true);
    }
    let lastTypingTime = new Date().getTime();
    var timerLength = 3000;
    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        setTyping(false);
      }
    }, timerLength);
  };

  return (
    <div>
      <Box
        margin="15px"
        marginLeft="150px"
        marginRight="150px"
        padding="10px"
        border="3px solid #42357b"
        background="#0d1521"
        color="#42357b"
        borderRadius="20px"
      >
        <Box>
          <Text fontFamily="Montserrat" fontSize="1.5em" fontWeight="bolder">
            {" "}
            Messages{" "}
          </Text>
        </Box>

        <Box
          margin="5px"
          padding="10px"
          border="5px solid #6b5ab8"
          background="#42357b"
          color="black"
          borderRadius="20px"
          width="99%"
        >
          <Stack overflowY="scroll">
            {messages.map((chat) => (
              <div key={chat._id}>
                <Box
                  margin="5px"
                  padding="10px"
                  border="3px solid #6b5ab8"
                  background="#0d1521"
                  color="#6b5ab8"
                  borderRadius="20px"
                >
                  <div>
                    <strong>Author:</strong> {chat.author}
                  </div>
                  <div>
                    <strong>Text:</strong> {chat.text}
                  </div>
                </Box>
              </div>
            ))}
          </Stack>
        </Box>

        <Box>
          <Box
            d="flex"
            flexDir="column"
            justifyContent="flex-end"
            p={3}
            bg="#E8E8E8"
            w="100%"
            h="100%"
            borderRadius="lg"
            overflowY="hidden"
          >
            <FormControl onKeyDown={sendMessage} mt={3}>
              <Input
                variant="filled"
                bg="#E0E0E0"
                placeholder="Enter a message.."
                value={newMessage}
                onChange={typingHandler}
              />
            </FormControl>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default ChatBox;

// backup
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { FormControl } from "@chakra-ui/form-control";
// import { Input } from "@chakra-ui/input";
// // import { useHistory } from "react-router-dom";
// import { Box, Stack } from "@chakra-ui/layout";
// import io from "socket.io-client";

// const ENDPOINT = "http://localhost:8080";
// let socket;

// const ChatBox = () => {
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState("");
//   const [typing, setTyping] = useState(false);

//   const fetchMessages = async () => {
//     const { data } = await axios.get("/api/users");

//     setMessages(data);
//   };

//   const sendMessage = async (event) => {
//     if (event.key === "Enter" && newMessage) {
//       // socket.emit("stop typing", selectedChat._id);
//       try {
//         const config = {
//           headers: {
//             "Content-type": "application/json",
//           },
//         };

//         setNewMessage("");

//         const { data } = await axios.post(
//           "/api/messagesToChatroom",
//           {
//             text: newMessage,
//           },
//           config
//         );

//         console.log(data);

//         socket.emit("new-message", data);
//         setMessages([...messages, data]);
//       } catch (error) {
//         console.log(error);
//       }
//     }
//   };

//   useEffect(() => {
//     socket = io(ENDPOINT);
//     // socket.emit("setup", user); creo que esta no va a ser necesaria
//     // socket.on("connected", () => setSocketConnected(true));
//     // socket.on("typing", () => setIsTyping(true));
//     // socket.on("stop typing", () => setIsTyping(false));
//     // eslint-disable-next-line
//   }, []);

//   useEffect(() => {
//     fetchMessages();
//   });

//   useEffect(() => {
//     socket.on("new-message", (newMessage) => {
//       console.log(`from chatbox.js ${newMessage}`)
//       // if (
//       //   !selectedChatCompare || // if chat is not selected or doesn't match current chat
//       //   selectedChatCompare._id !== newMessageRecieved.chat._id
//       // ) {
//       //   if (!notification.includes(newMessageRecieved)) {
//       //     setNotification([newMessageRecieved, ...notification]);
//       //     setFetchAgain(!fetchAgain);
//       //   }
//       // } else {
//         setMessages([...messages, newMessage]);
//     });
//   });

//   const typingHandler = (e) => {
//     setNewMessage(e.target.value);

//     // if (!socketConnected) return;

//     if (!typing) {
//       setTyping(true);
//       // socket.emit("typing", selectedChat._id);
//     }
//     let lastTypingTime = new Date().getTime();
//     var timerLength = 3000;
//     setTimeout(() => {
//       var timeNow = new Date().getTime();
//       var timeDiff = timeNow - lastTypingTime;
//       if (timeDiff >= timerLength && typing) {
//         //  socket.emit("stop typing", selectedChat._id);
//         setTyping(false);
//       }
//     }, timerLength);
//   };

//   return (
//     <div>
//       <Box
//         pb={3}
//         px={3}
//         fontSize={{ base: "28px", md: "30px" }}
//         fontFamily="Work sans"
//         d="flex"
//         w="100%"
//         justifyContent="space-between"
//         alignItems="center"
//         bg="white"
//       >
//         Messages
//       </Box>

//       <Box bg="pink">
//         <Stack overflowY="scroll">
//           {messages.map((chat) => (
//             <div key={chat._id}>
//               <div>
//                 <strong>Author:</strong> {chat.author}
//               </div>
//               <div>
//                 <strong>Text:</strong> {chat.text}
//               </div>
//             </div>
//           ))}
//         </Stack>

//         <Box
//           d="flex"
//           flexDir="column"
//           justifyContent="flex-end"
//           p={3}
//           bg="#E8E8E8"
//           w="100%"
//           h="100%"
//           borderRadius="lg"
//           overflowY="hidden"
//         >
//           {/* {(
//               <div className="messages">
//                 <messages={messages} />
//               </div>
//             )} */}

//           <FormControl
//             onKeyDown={sendMessage}
//             // id="first-name"
//             // isRequired
//             mt={3}
//           >
//             <Input
//               variant="filled"
//               bg="#E0E0E0"
//               placeholder="Enter a message.."
//               value={newMessage}
//               onChange={typingHandler}
//             />
//           </FormControl>
//         </Box>
//       </Box>
//     </div>
//   );
// };

// export default ChatBox;
