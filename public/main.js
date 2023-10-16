var socket = io.connect("http://localhost:8080", {
  forceNew: true,
});

// Listen for the "messages" event (initial messages)
socket.on("messages", function (data) {
  render(data);
});

// Listen for the "new-message" event (real-time messages)
socket.on("new-message", function (data) {
  addMessageToUI(data);
});

function render(data) {
  // Render initial messages when the page loads
  data.forEach(function (message) {
    addMessageToUI(message);
  });
}

function addMessageToUI(data) {
  // Add the new message to the UI
  var messageHtml = `
  <div>
    <strong>author: ${data.author}</strong>
    <br>
    <em>Message: ${data.text}</em>
    <br><br>
  </div>
  `;
  document.getElementById("messages").innerHTML += messageHtml;
}

function sendMessage(event) {
  event.preventDefault();

  var text = document.getElementById("text").value;

  var messageData = {
    text: text, // Remove recipientUser
  };

  // Send the message data to the server using the sendMessage1 function
  // fetch("/api/messages1", { // Update the URL
    fetch("/api/messagesToChatroom", { // Update the URL
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(messageData),
  })
    .then((response) => response.json())
    .then((data) => {
      // Handle the response if needed
    })
    .catch((error) => {
      console.error("Error sending message:", error);
    });

  // Clear the input fields
  document.getElementById("text").value = ""; // Remove recipientUser
}

// Replace the event handler for the form submission
document.querySelector("form").onsubmit = sendMessage;


// ESTA FUNCIONA PARA PRIVATEMESSAGES
// var socket = io.connect("http://localhost:8080", {
//   forceNew: true,
// });

// // Listen for the "messages" event (initial messages)
// socket.on("messages", function (data) {
//   render(data);
// });

// // Listen for the "new-message" event (real-time messages)
// socket.on("new-message", function (data) {
//   addMessageToUI(data);
// });

// function render(data) {
//   // Render initial messages when the page loads
//   data.forEach(function (message) {
//     addMessageToUI(message);
//   });
// }

// function addMessageToUI(data) {
//   // Add the new message to the UI
//   var messageHtml = `
//   <div>
//   <em>recipientUser: ${data.recipientUser}</em>
//   <strong>author: ${data.author}</strong>
//   <br>
//   <em>Message: ${data.text}</em>
//   <br><br>
// </div>
//   `;
//   document.getElementById("messages").innerHTML += messageHtml;
// }


// function sendMessage(event) {
//   event.preventDefault();

//   var recipientUser = document.getElementById("recipientUser").value;
//   var text = document.getElementById("text").value;

//   var messageData = {
//     recipientUser: recipientUser,
//     text: text,
//   };

//   // Send the message data to the server using the sendMessage1 function
//   fetch(`/api/messages1/${recipientUser}`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(messageData),
//   })
//     .then((response) => response.json())
//     .then((data) => {
//       // Handle the response if needed
//     })
//     .catch((error) => {
//       console.error("Error sending message:", error);
//     });

//   // Clear the input fields
//   document.getElementById("recipientUser").value = "";
//   document.getElementById("text").value = "";
// }

// // Replace the event handler for the form submission
// document.querySelector("form").onsubmit = sendMessage;






















// esta era la funcion donde tocaba anadir el author manualmente

// en esta me toca insertar manualmente el author
// function addMessage(event) {
//   event.preventDefault();

//   var recipientUser = document.getElementById("recipientUser").value;
//   var author = document.getElementById("author").value;
//   var text = document.getElementById("text").value;

//   var messageData = {
//     recipientUser: recipientUser,
//     author: author,
//     text: text,
//   };

//   // Send the message data to the server (POST request)
//   fetch(`/api/messages/${recipientUser}`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(messageData),
//   })
//     .then((response) => response.json())
//     .then((data) => {
//       // Handle the response if needed
//     })
//     .catch((error) => {
//       console.error("Error sending message:", error);
//     });

//   // Clear the input fields
//   document.getElementById("recipientUser").value = "";
//   document.getElementById("author").value = "";
//   document.getElementById("text").value = "";
// }


// este es el sel simulacro, funciona bien
// var socket = io.connect("http://localhost:8080", {
//   forceNew: true,
// });

// // en el cliente eres tu solo entonces solo debes escuchar en tu socket, aqui en este

// socket.on("messages", function (data) {
//   console.log(data);
//   render(data);
// });

// function render(data) {
//   var html = data
//     .map(function (elem, index) {
//       return `<div>
//                 <em>${elem.recipientUser}</em>
//                 <strong>${elem.author}</strong>: 
//                 <em>${elem.text}</em> 
//               </div>`;
//     })
//     .join(" ");
//   document.getElementById("messages").innerHTML = html;
// }

// function addMessage(e) {
//   var message = {
//     recipientUser: document.getElementById("recipientUser").value,
//     author: document.getElementById("author").value,
//     text: document.getElementById("text").value,
//   };

//   // y omitir en mi socket el evento que estoy creando
//   socket.emit("new-message", message);
//   return false;
// }
