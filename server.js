const express = require("express");
const connectDB = require("./src/config/db");
require('dotenv').config();

const app = express();
app.use(express.json());
connectDB();

app.get("/api/health", (req, res) => {
  res.json({ status: "Server is working fine" });
});
app.get("/api/info", (req, res) => {
  res.send("Welcome to NOTED API");
});
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
