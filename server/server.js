const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const path = require("path");
const connectToMongo = require("./config/resumedb");
const { errorHandler } = require("./utils/errorHandler");
const geminiRoutes = require("./routes/geminiRoutes");

// Dynamic Routes
const dynamicResumeTemplateRoutes=require("./routes/dynamicRoutes/dynamicResumeRoutes")


const resumeTemplate1Routes = require("./routes/resumeTemplateRoutes/resumeTemplate1Route");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet({ contentSecurityPolicy: false }));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(morgan("dev"));
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "public")));

//  Register Resume Routes with distinct paths
app.use("/api/resume", resumeTemplate1Routes);

app.use("/api/enhance", geminiRoutes); 

// Health check route
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", message: "Server is running" });
});

// Error handling middleware
app.use(errorHandler);

// Start server
async function startServer() {
  try {
    await connectToMongo(); //  Ensure MongoDB is connected before starting the server

    app.listen(PORT, () => {
      console.log(` Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error(" Failed to start server:", error);
    process.exit(1);
  }
}

// Handle uncaught exceptions
process.on("uncaughtException", (error) => {
  console.error(" Uncaught Exception:", error);
  process.exit(1);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (error) => {
  console.error(" Unhandled Rejection:", error);
  process.exit(1);
});

startServer();