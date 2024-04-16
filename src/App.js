import React, { useState, useEffect, useRef } from "react";
import ChatInput from "./ChatInput"; // Importing ChatInput component
import ChatMessage from "./ChatMessage"; // Importing ChatMessage component
import MentionList from "./MentionList"; // Importing MentionList component
import io from "socket.io-client"; // Importing socket.io-client library
import "./App.css"; // Importing CSS file for styling

// Array of user names
const user_list = ["Alan", "Bob", "Carol", "Dean", "Elin"];

function App() {
  const [messages, setMessages] = useState([]); // State to manage chat messages
  const [socket, setSocket] = useState(null); // State to manage socket connection
  const messageContainerRef = useRef(null); // Reference to message container for scrolling

  useEffect(() => {
    // Create a new socket connection
    const newSocket = io("http://localhost:5000");
    setSocket(newSocket);

    // Clean up the socket connection when the component unmounts
    return () => {
      newSocket.close();
    };
  }, []);

  useEffect(() => {
    // Check if the socket is initialized
    if (!socket) return;

    // Listen for 'message' events from the server
    socket.on("message", (message) => {
      // Update the message state with the received message
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    // Clean up the event listener when the component unmounts
    return () => {
      socket.off("message");
    };
  }, [socket]);

  const sendMessage = (message) => {
    // Emit the message to the server
    socket.emit("message", { text: message });

    // Optionally, update the UI immediately with the sent message
    const randomUser = user_list[Math.floor(Math.random() * user_list.length)];
    const newMessage = { user: randomUser, text: message };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  return (
    <div className="App">
      <div className="ChatContainer">
        <div className="Sidebar">
          <h1 className="app-name">SPACE CHAT</h1>
          <MentionList users={user_list} />{" "}
          {/* Render the MentionList component */}
        </div>
        <div className="MessageContainer" ref={messageContainerRef}>
          {/* Render message container or empty message GIF */}
          {messages.length === 0 ? (
            <img
              src="https://media.tenor.com/CigpzapemsoAAAAi/hi-robot.gif"
              alt="Empty message container"
              style={{
                height: 200,
                width: 250,
                display: "flex",
                alignItems: "baseline",
                marginTop: "180px",
                marginLeft: "390px",
              }}
            />
          ) : (
            messages.map((message, index) => (
              <ChatMessage
                key={index}
                message={message.text}
                user={message.user}
              />
            ))
          )}
          <ChatInput onSendMessage={sendMessage} />{" "}
          {/* Render the ChatInput component */}
        </div>
      </div>
    </div>
  );
}

export default App; // Export the App component
