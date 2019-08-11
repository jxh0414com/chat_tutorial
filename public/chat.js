// Make Connection
let socket = io.connect("http://localhost:5000");

// Query DOM
let message = document.getElementById("message");
let member = document.getElementById("member");
let btn = document.getElementById("send");
let chats_message = document.getElementById("chat-message");
let someone_typing = document.getElementById("someone_typing");

// EMIT Events

btn.addEventListener("click", function() {
  if (member.value != "")
    socket.emit("chat", {
      message: message.value,
      member: member.value
    });
  message.value = "";
});

message.addEventListener("keypress", function() {
  if (member.value != "") socket.emit("typing", member.value);
});

member.addEventListener("focusout", function() {
  member.value = member.value.charAt(0).toUpperCase() + member.value.slice(1);
  socket.emit("joined", member.value);
  member.disabled = true;
});

// Listen for events
socket.on("chat", function(data) {
  someone_typing.innerHTML = "";
  chats_message.innerHTML +=
    "<p><strong>" + data.member + ": </strong>" + data.message + "</p>";
});

// Listen for broadcast
socket.on("typing", function(data) {
  someone_typing.innerHTML = "<p><em>" + data + " is typing... </em></p>";
});

// Listen for Joined broadcast
socket.on("joined", function(data) {
  if (data != "")
    chats_message.innerHTML +=
      "<h3><em>" + data + " joined the chat room... </em></h3>";
});
