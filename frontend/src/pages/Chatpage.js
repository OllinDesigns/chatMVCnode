import React, { useEffect, useState } from "react";
import axios from "axios";

const Chatpage = () => {
    const [chats, setChats] = useState([])

    const fetchChats = async () => {
        const { data } =  await axios.get('/api/messages');
        
        setChats(data)

    };

    useEffect(() => {

        fetchChats();
    })


    return <div>


<div>
  {chats.map((chat) => (
    <div key={chat._id}>
      {Object.keys(chat).map((key) => {
        if (key !== '__v') {
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



  </div>;





};

export default Chatpage;



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
