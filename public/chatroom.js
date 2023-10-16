// Establish a Socket.IO connection to the server
var socket = io.connect("http://localhost:8080", {
  forceNew: true,
});



socket.on("new-ChatMessage", function (data) {
  addMessageToUI(data);
});


function addMessageToUI(data) {
  // Add the new message to the UI
  var messageHtml = `
  <div>
    <em>recipientUser: ${data.recipientUser}</em>
    <strong>author: ${data.author}</strong>
    <br>
    <em>Message: ${data.text}</em>
    <br><br>
  </div>
  `;
  document.getElementById("messages").innerHTML += messageHtml;
}



function sendMessageToChatroom(event) { // Change the function name
  event.preventDefault();

  var recipientUser = document.getElementById("recipientUser").value;
  var text = document.getElementById("text").value;

  var messageData = {
    recipientUser: recipientUser,
    text: text,
  };

  fetch(`/api/chatroom/messages/${recipientUser}`, { // Update the URL
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

  document.getElementById("recipientUser").value = "";
  document.getElementById("text").value = "";
}

document.querySelector("form").onsubmit = sendMessageToChatroom; // Replace the event handle
// document.querySelector("form").onsubmit = sendMessageToChatroom; // Replace the event handler










// Listen for the "new-message" event (real-time messages)
// socket.on("new-message", function (data) {
//   addMessageToUI(data);
// });



// function addMessageToUI(data) {
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







// this commented part do not work. need better implementation
// var socket = io.connect("http://localhost:8080", {
//   forceNew: true,
// });

// socket.on("new-ChatMessage", function (data) {
//   render(data);
// });

// socket.on("new-message", function (data) {
//   addMessageToUI(data);
// });

// function render(data) {
//   data.forEach(function (message) {
//     addMessageToUI(message);
//   });
// }