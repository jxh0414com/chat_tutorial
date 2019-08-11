const express = require("express");
const socket = require("socket.io");

// App Setup
const app = express();

const port = process.env.PORT || 5000;

const server = app.listen(port, () =>
  console.log(`Server started on port ${port}`)
);

// Static files
app.use(express.static("public"));

// Socket setup
const io = socket(server);

io.on("connection", function(socket) {
  console.log(`Socket.io connected to server`, socket.id);

  // Handle chat event
  socket.on("chat", function(data) {
    io.sockets.emit("chat", data);
  });

  // Typing event
  socket.on("typing", function(data) {
    socket.broadcast.emit("typing", data);
  });

  // Member joined event
  socket.on("joined", function(data) {
    socket.broadcast.emit("joined", data);
  });
});
