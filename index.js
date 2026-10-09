const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");

const connectDB = require("./src/configs/db");

const authRoutes = require("./src/routes/auth.routes");
const userRoutes = require("./src/routes/user.routes");

dotenv.config();

const app = express();

const PORT = process.env.PORT || 4000;

// Middleware
app.use(express.json());
app.use(morgan("dev"));

// Database
connectDB();

// Home route
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to EventHorizon API"
  });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

app.listen(PORT, () => {
  console.log(`EventHorizon server running on port ${PORT}`);
});