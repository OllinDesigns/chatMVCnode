import React, { useEffect, useState } from "react";
import axios from "axios";
// import { useHistory } from "react-router-dom";
import { Box, Text } from "@chakra-ui/layout";

const Users = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const { data } = await axios.get("/api/users");
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <Box width="35%" marginTop="-10px">
      <Box
        margin="12px"
        padding="10px"
        border="3px solid #42357b"
        background="#0d1521"
        color="#42357b"
        textAlign="center"
        borderRadius="20px"
      >
        <Text fontFamily="Montserrat" fontSize="1.5em" fontWeight="bold">
          Registered users
        </Text>
      </Box>
      <Box
        margin="12px"
        padding="5px"
        border="5px solid #42357b"
        background="#0d1521"
        color="black"
        borderRadius="20px"
      >
        <Box>
          {users.map((chat) => (
            <Box key={chat._id}>
              <Box
                margin="5px"
                fontFamily="Work Sans"
                fontWeight="bold"
                padding="10px"
                border="3px solid #42357b"
                background="#6b5ab8"
                color="black"
                borderRadius="20px"
              >
                {Object.keys(chat).map((key) => {
                  if (
                    key !== "__v" &&
                    key !== "googleId" &&
                    key !== "messages"
                  ) {
                    return (
                      <Box key={key}>
                        <strong>{key}:</strong> {chat[key]}
                      </Box>
                    );
                  }
                  return null;
                })}
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Users;
