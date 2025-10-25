require('dotenv').config();
const express = require("express");
const connectDB = require("./src/config/db");

const app = express();
app.use(express.json());


app.get("/api/health", (req, res) => {
  res.json({ status: "Server is working fine" });
});
app.get("/api/info", (req, res) => {
  res.send("Welcome to NOTED API");
});

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(process.env.PORT, () => {
      console.log(`🚀 Server running on port ${process.env.PORT}`);
    });
  } catch (err) {
    console.error('❌ Failed to start server:', err.message);
    process.exit(1);
  }
};

startServer();
