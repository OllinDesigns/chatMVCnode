import React, { useEffect, useState } from "react";
import axios from "axios";
import { FormControl } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
// import { useHistory } from "react-router-dom";
import { Box, Stack } from "@chakra-ui/layout";

const ENDPOINT = "http://localhost:8080";

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
      // socket.emit("stop typing", selectedChat._id);
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

        // socket.emit("new message", data);
        setMessages([...messages, data]);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    // socket = io(ENDPOINT);
    // socket.emit("setup", user);
    // socket.on("connected", () => setSocketConnected(true));
    // socket.on("typing", () => setIsTyping(true));
    // socket.on("stop typing", () => setIsTyping(false));
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    fetchMessages();
  });

  const typingHandler = (e) => {
    setNewMessage(e.target.value);

    // if (!socketConnected) return;

    if (!typing) {
      setTyping(true);
      // socket.emit("typing", selectedChat._id);
    }
    let lastTypingTime = new Date().getTime();
    var timerLength = 3000;
    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        //  socket.emit("stop typing", selectedChat._id);
        setTyping(false);
      }
    }, timerLength);
  };

  return (
    <div>
      <Box
        pb={3}
        px={3}
        fontSize={{ base: "28px", md: "30px" }}
        fontFamily="Work sans"
        d="flex"
        w="100%"
        justifyContent="space-between"
        alignItems="center"
        bg="white"
      >
        Messages
      </Box>

      <Box bg="pink">
        <Stack overflowY="scroll">
          {messages.map((chat) => (
            <div key={chat._id}>
              <div>
                <strong>Author:</strong> {chat.author}
              </div>
              <div>
                <strong>Text:</strong> {chat.text}
              </div>
            </div>
          ))}
        </Stack>

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
          {/* {(
              <div className="messages">
                <messages={messages} />
              </div>
            )} */}

          <FormControl
            onKeyDown={sendMessage}
            // id="first-name"
            // isRequired
            mt={3}
          >
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
    </div>
  );
};

export default ChatBox;
