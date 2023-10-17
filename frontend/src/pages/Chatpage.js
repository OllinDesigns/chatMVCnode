import React from "react";
// import React, { useEffect, useState } from "react";
// import axios from "axios";
import ChatBox from "../components/ChatPage/chatBox";
import Users from "../components/ChatPage/Users";
import { Box } from "@chakra-ui/layout";
import SideDrawer from "./SideDrawer";

const Chatpage = () => {



  return (
    <div style={{ width: "100%" }}>
      <Box>{ <SideDrawer/>}</Box>
      
      <Box d="flex"  bg="rgba(9, 13, 19, 0.5)" justifyContent="space-between" w="100%" h="91.5vh" >
        <Users />
        
        <ChatBox />

        
      </Box>
      </div>
    
  );
};

export default Chatpage;



//     const [chats, setChats] = useState([])

//     const fetchChats = async () => {
//         const { data } =  await axios.get('/api/messages');

//         setChats(data)

//     };

//     useEffect(() => {

//         fetchChats();
//     })

// this one renders all the fields of the document
// chats.map((chat) => (
//     <div>
//       {Object.keys(chat).map((key) => (
//         <div key={key}>
//           <strong>{key}:</strong> {chat[key]}
//         </div>
//       ))}
//     </div>
//   ))}

// this one renders onle the text
//   return <div>
//     {chats.map(chat=>
//     <div key={chat._id}>{chat.text}</div>)}
//   </div>;
