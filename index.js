import express, { urlencoded } from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import connectDb from "./utils/db.js";
import userRoute from "./routes/userRoute.js";
import cors from "cors";

// Load environment variables
dotenv.config();

// Set up the port and initialize express app
const PORT = process.env.PORT || 5000;
const app = express();

// Function to connect to DB and start the server
const startServer = async () => {
    try {
        // Connect to the database
        await connectDb();  
        console.log("Database connected successfully!");

        // Start the Express server
        app.listen(PORT, '0.0.0.0', () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    } catch (error) {
        // Log errors that happen during the connection or startup
        console.error("Failed to start server:", error);
        process.exit(1); // Exit the process if the server fails to start
    }
};

// Middleware to handle CORS
const corsOptions = {
    origin: '*', // Allow requests only from this origin
    credentials: true, // Allow cookies and authorization headers with requests
};

// Use middlewares
app.use(cors(corsOptions)); // Enable CORS for all routes
app.use(express.json()); // Parse JSON bodies
app.use(cookieParser()); // Parse cookies
app.use(urlencoded({ extended: true })); // Parse URL-encoded bodies (for form submissions)

// Root endpoint
app.get("/", (req, res) => {
    return res.status(200).json({
        message: "I'm coming from backend",
        success: true,
    });
});

// Use API Routes (e.g., /api/user)
app.use("/api", userRoute);

// Start the server
startServer();
