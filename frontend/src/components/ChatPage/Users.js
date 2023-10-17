import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
// import {
//     Menu,
//     MenuDivider,
//     MenuItem,
//     MenuList,
//   } from "@chakra-ui/menu";
import { Box } from "@chakra-ui/layout";

const Users = () => {
  const history = useHistory();

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    history.push("/");
  };

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
      the Users show more things here
      <Box bg="tomato" w="40%" p={4} color="white">
        <div>
          {users.map((chat) => (
            <div key={chat._id}>
              {Object.keys(chat).map((key) => {
                if (key !== "__v") {
                  return (
                    <div key={key}>
                      <strong>{key}:</strong> {chat[key]}
                    </div>
                  );
                }
                return null;
              })}
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
