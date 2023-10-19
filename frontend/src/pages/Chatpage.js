import React from "react";
import ChatBox from "../components/ChatPage/chatBox";
import Users from "../components/ChatPage/Users";
import { Box } from "@chakra-ui/layout";
import SideDrawer from "../components/ChatPage/SideDrawer";

const Chatpage = () => {
  return (
    <Box style={{ width: "100%" }}>
      <Box>{<SideDrawer />}</Box>

      <Box
        display="flex"
        flexDirection="row"
        marginLeft="150px"
        marginRight="150px"
        bg="rgba(9, 13, 19, 0.5)"
        justifyContent="space-between"
        h="91.5vh"
      >
        <ChatBox />
        <Users />
      </Box>
    </Box>
  );
};

export default Chatpage;
