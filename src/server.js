const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors"); // Import cors middleware
const app = express();
const server = http.createServer(app);

// Use cors middleware to allow cross-origin requests
app.use(
  cors({
    origin: "http://localhost:3000", // Allow requests from localhost:3000
    credentials: true, // Include credentials in CORS requests
  })
);

const io = socketIo(server);

// Handle socket connection
io.on("connection", (socket) => {
  console.log("New client connected");

  // Listen for 'message' event from client
  socket.on("message", (message) => {
    console.log("Message received:", message);
    io.emit("message", message); // Broadcast the message to all clients
  });

  // Listen for 'disconnect' event from client
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

// Route for testing server status
app.get("/", (req, res) => {
  res.send("WebSocket server running");
});

// Define port for the server to listen on
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
