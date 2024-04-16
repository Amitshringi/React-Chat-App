import io from 'socket.io-client'; // Import the socket.io-client library

// Create a new socket instance with the server URL and options
const socket = new io('http://localhost:5000', {
    autoConnect: true, // Automatically connect to the server
    credentials: true // Include credentials in CORS requests
});

export default socket; // Export the socket instance for use in other parts of the application
