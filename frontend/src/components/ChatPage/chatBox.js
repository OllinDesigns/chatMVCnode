import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { FormControl } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Box, Stack, Text } from "@chakra-ui/layout";
import io from "socket.io-client";

let socket = io.connect("http://localhost:8080", {
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionAttempts: 10,
});

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [typing, setTyping] = useState(false);
  const messagesRef = useRef();

  const scrollToBottom = () => {
    messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
  };

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

        scrollToBottom();

        // console.log("Message sent to server:", data);
        socket.emit("new-message", data);
        // console.log("Socket emit sent:", data);
        setMessages([...messages, data]);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    fetchMessages();
  });

  useEffect(() => {
    socket.on("new-message", (newMessage) => {
      // console.log(`from chatbox.js ${newMessage}`);
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });
  });

  useEffect(() => {
    const container = messagesRef.current;
    if (container) {
      if (
        container.scrollHeight - container.scrollTop <=
        container.clientHeight + 50
      ) {
        scrollToBottom();
      }
    }
  }, [messages]);

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
    <Box
      padding="10px"
      border="3px solid #42357b"
      background="#0d1521"
      color="#42357b"
      borderRadius="20px"
      width="65%"
      maxHeight="80vh"
    >
      <Box>
        <Text fontFamily="Montserrat" fontSize="1.5em" fontWeight="bolder">
          {/* {" "} */}
          Messages{" "}
        </Text>
      </Box>
      <Box
        margin="2px"
        padding="10px"
        border="5px solid #6b5ab8"
        background="#42357b"
        color="black"
        borderRadius="20px"
        width="99%"
        height="auto"
      >
        <Stack overflowY="scroll" maxHeight="60vh" ref={messagesRef}>
          {messages.map((message) => (
            <Box key={message._id}>
              <Box
                padding="10px"
                border="3px solid #6b5ab8"
                background="#0d1521"
                color="#6b5ab8"
                borderRadius="15px"
                minWidth="auto"
              >
                <Text fontFamily="Roboto">
                  <Box>Author: {message.author}</Box>
                  <Box fontSize="1.5em">
                    Text: <strong>{message.text}</strong>
                  </Box>
                </Text>
              </Box>
            </Box>
          ))}
        </Stack>
      </Box>

      <Box>
        <Box
          border="5px solid #42357b"
          marginTop="10px"
          bg="#6b5ab8"
          d="flex"
          flexDir="column"
          justifyContent="flex-end"
          p={3}
          w="100%"
          h="100%"
          borderRadius="lg"
          overflowY="hidden"
        >
          <FormControl onKeyDown={sendMessage} mt={3}>
            <Input
              marginTop="-10px"
              variant="filled"
              bg="#E0E0E0"
              placeholder="Enter a message and press Enter"
              value={newMessage}
              onChange={typingHandler}
            />
          </FormControl>
        </Box>
      </Box>
    </Box>
  );
};

export default ChatBox;
