import React from "react";

// Functional component for rendering a mention list
const MentionList = ({ users, onSelectMention }) => {
  // Check if users array is defined and not empty before mapping over it
  if (!users || users.length === 0) {
    return null; // Return null if users array is undefined or empty
  }

  return (
    <div className="Sidebar">
      {/* Title for the mention list */}
      <h2 style={{ fontWeight: "bold" }}>Users</h2>
      {/* Render the list of users */}
      <ul className="MentionList">
        {/* Map over the users array to render mention items */}
        {users.map((user, index) => (
          <li key={index}>{user}</li>
        ))}
      </ul>
    </div>
  );
};

export default MentionList; // Export the MentionList component
