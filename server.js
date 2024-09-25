const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const http = require('http'); // To create an HTTP server
const socketIo = require('socket.io'); // Socket.IO for real-time
const twilioClient = require("./config/twilio"); // Twilio client
const morgan = require('morgan'); // HTTP request logger
const PORT = process.env.PORT || 8000;
require('dotenv').config();

const server = http.createServer(app); // Create HTTP server
const io = socketIo(server); // Integrate Socket.IO

// Mongoose connection
mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
        console.log("Database connected");
    })
    .catch(err => {
        console.error("Database connection error:", err);
    });

// Middleware setup
app.use(cors({
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200,
}));
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev')); // Logging middleware

// Starting point of the server
app.get("/", (req, res) => {
    res.status(200).json("Welcome to the 8 Store API");
});

// Function to send OTP using Twilio
const sendOtp = (phoneNumber, otp) => {
    twilioClient.messages
        .create({
            body: `Your OTP is ${otp}`,
            from: process.env.TWILIO_PHONE_NUMBER,
            to: phoneNumber,
        })
        .then(() => {
            io.emit("otpSent", { phoneNumber, otp }); // Emit OTP event through WebSocket
        })
        .catch((error) => {
            console.error("Error sending OTP:", error);
            io.emit("otpError", { error: "Failed to send OTP" }); // Emit error event
        });
};

// Import user routes and pass 'io' to it
const Routes = require("./routes")(io);  // Pass io for real-time features
app.use("/api", Routes);  // Use userRoutes with '/api' prefix

// Handle Socket.IO connections
io.on("connection", (socket) => {
    console.log("New client connected");

    socket.on("disconnect", () => {
        console.log("Client disconnected");
    });
});

// Start listening
server.listen(PORT, () => {
    console.log(`Server started at port number: ${PORT}`);
});

module.exports = app;
