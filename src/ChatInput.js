import React, { useState } from "react";
import EmojiPicker from "emoji-picker-react"; // Importing EmojiPicker component
import MentionList from "./MentionList"; // Importing MentionList component

// Functional component for the chat input
const ChatInput = ({ onSendMessage, users }) => {
  // State variables
  const [message, setMessage] = useState(""); // State to manage message input
  const [showEmojiPicker, setShowEmojiPicker] = useState(false); // State to manage emoji picker visibility
  const [showMentionList, setShowMentionList] = useState(false); // State to manage mention list visibility

  // Function to handle message input change
  const handleMessageChange = (e) => {
    setMessage(e.target.value);
    // Show mention list if message starts with '@'
    if (e.target.value.startsWith("@")) {
      setShowMentionList(true);
    } else {
      setShowMentionList(false);
    }
  };

  // Function to send message
  const handleSendMessage = () => {
    if (message.trim() !== "") {
      onSendMessage(message);
      setMessage(""); // Clear the message input after sending
    }
  };

  // Function to handle Enter key press
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSendMessage(); // Trigger send message function when Enter key is pressed
    }
  };

  // Function to toggle emoji picker visibility
  const handleToggleEmojiPicker = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  // Function to handle emoji selection
  const handleSelectEmoji = (emoji, event) => {
    setMessage(prevMessage => prevMessage + emoji.emoji); // Append the selected emoji to the message
  };

  // Function to handle mention selection
  const handleMentionSelect = (user) => {
    setMessage(message + user); // Append the selected user to the message
    setShowMentionList(false); // Hide the mention list after selection
  };

  return (
    <div className="input-group mb-3 ChatInput">
      {/* Message input field */}
      <input
        type="text"
        className="form-control"
        onKeyPress={handleKeyPress}
        value={message}
        onChange={handleMessageChange}
        placeholder="Type Message..."
        aria-label="Recipient's username"
        aria-describedby="button-addon2"
      />
      {/* Emoji picker button */}
      <button className="EmojiPickerButton" onClick={handleToggleEmojiPicker}>
        😀
      </button>
      {/* Render emoji picker if showEmojiPicker is true */}
      {showEmojiPicker && (
        <EmojiPicker onEmojiClick={handleSelectEmoji} />
      )}
      {/* Render mention list if showMentionList is true */}
      {showMentionList && (
        <MentionList users={users} onSelectMention={handleMentionSelect} />
      )}
      {/* Send message button */}
      <button
        className="btn btn-outline-secondary"
        onClick={handleSendMessage}
        type="button"
        id="button-addon2"
      >
        {/* Send button icon */}
        <img
          alt="send-btn"
          src="https://cdn-icons-png.flaticon.com/128/786/786407.png"
          className="send-btn-img"
        />
      </button>
    </div>
  );
};

export default ChatInput; // Export the ChatInput component
