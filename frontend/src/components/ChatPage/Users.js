import React, { useEffect, useState } from "react";
import axios from "axios";
// import { useHistory } from "react-router-dom";
// import {
//     Menu,
//     MenuDivider,
//     MenuItem,
//     MenuList,
//   } from "@chakra-ui/menu";
import { Box, Text } from "@chakra-ui/layout";

const Users = () => {
  // const history = useHistory();

  // const logoutHandler = () => {
  //   localStorage.removeItem("userInfo");
  //   history.push("/");
  // };

  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const { data } = await axios.get("/api/users");

    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  });

  return (
    <div>
      <Box
      margin="12px"
      marginLeft="150px"
      marginRight="150px"
      padding="10px"
      border="3px solid #42357b"
      background="#0d1521"
      color="#42357b"
      textAlign="center"
      borderRadius="20px"
      width="38%"
      >

<Text fontFamily="Montserrat" fontSize="1.5em" fontWeight="bolder"> Registered users </Text>
      </Box>
      <Box margin="12px"
      marginLeft="150px"
      marginRight="150px"
      padding="5px"
      border="5px solid #42357b"
      background="#0d1521"
      color="black"
      borderRadius="20px"
      width="38%">

<div>
  {users.map((chat) => (
    <div key={chat._id}>
      <Box margin="5px"
      padding="10px"
      border="3px solid #42357b"
      background="#6b5ab8"
      // background="#0d1521"
      color="black"
      borderRadius="20px"
      width="80%">
      {Object.keys(chat).map((key) => {
        // Check if the key is not 'googleId' or 'messages'
        if (key !== '__v' && key !== 'googleId' && key !== 'messages') {
          return (
            <div key={key}>
              <strong>{key}:</strong> {chat[key]}
            </div>
          );
        }
        return null;
      })}
      </Box>
    </div>
  ))}
</div>
      </Box>
    </div>
  );
};

export default Users;





// {/* <Menu>

// <MenuList>
//   {/* <ProfileModal user={user}>
//     <MenuItem>My Profile</MenuItem>{" "}
//   </ProfileModal> */}
//   <MenuDivider />
//   <MenuItem onClick={logoutHandler}>Logout</MenuItem>
// </MenuList>
// </Menu> */}
