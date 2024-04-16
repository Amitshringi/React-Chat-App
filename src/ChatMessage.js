import React, { useState } from "react";

// Functional component for rendering a chat message
const ChatMessage = ({ message, user }) => {
  // State for managing like count
  const [likeCount, setLikeCount] = useState(0);

  // Function to handle like button click
  const handleLike = () => {
    setLikeCount(likeCount + 1);
  };

  return (
    <>
      {/* Chat message container */}
      <div className="container chat-container">
        <div className="message d-flex align-items-center">
          {/* User avatar */}
          <img
            src="https://cdn-icons-png.flaticon.com/128/3135/3135715.png"
            alt="Avatar"
            className="avatar"
          />
          <div className="text-sent">
            {/* User name */}
            <p>
              <strong>{user}</strong>
            </p>
            {/* Message text */}
            <div className="card">
              <span className="message-span">{message} </span>
            </div>

            {/* Like button */}
            <button
              onClick={handleLike}
              className="like-btn"
              style={{ border: "none" }}
            >
              {/* Like icon */}
              <img
                alt="Like img"
                src="https://cdn-icons-png.flaticon.com/128/9790/9790408.png"
                style={{ height: 10, width: 10, textSizeAdjust: 1 }}
              />{" "}
              {/* Display like count */}
              {likeCount}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatMessage; // Export the ChatMessage component
