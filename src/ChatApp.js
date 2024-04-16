// ChatApp.js
import React, { useState } from "react";
import ChatInput from "./ChatInput"; // Importing ChatInput component
import ChatMessage from "./ChatMessage"; // Importing ChatMessage component
import EmojiPicker from "./EmojiPicker"; // Importing EmojiPicker component
import MentionList from "./MentionList"; // Importing MentionList component

// Array of user names
const user_list = ["Alan", "Bob", "Carol", "Dean", "Elin"];

// Functional component for the chat application
const ChatApp = () => {
  // State variables
  const [messages, setMessages] = useState([]); // State to manage chat messages
  const [selectedEmoji, setSelectedEmoji] = useState(null); // State to manage selected emoji
  const [mentionedUser, setMentionedUser] = useState(null); // State to manage mentioned user

  // Function to send a message
  const sendMessage = (message) => {
    const randomUser = user_list[Math.floor(Math.random() * user_list.length)];
    const newMessage = { user: randomUser, text: message };
    setMessages([...messages, newMessage]);
  };

  // Function to handle emoji selection
  const handleEmojiSelect = (emoji) => {
    setSelectedEmoji(emoji);
  };

  // Function to handle user mention
  const handleMentionSelect = (user) => {
    setMentionedUser(user);
  };

  return (
    <div>
      <div>
        {/* Render messages */}
        {messages.map((message, index) => (
          <ChatMessage key={index} message={message.text} user={message.user} />
        ))}
      </div>
      {/* Render emoji picker */}
      <EmojiPicker onSelectEmoji={handleEmojiSelect} />
      {/* Render mention list */}
      <MentionList users={user_list} onSelectUser={handleMentionSelect} />
      {/* Render message input box */}
      <ChatInput onSendMessage={sendMessage} />
    </div>
  );
};

export default ChatApp; // Export the ChatApp component
