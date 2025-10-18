const express = require("express");
const connectDB = require("./src/config/db");
connectDB();
const app = express();
app.use(express.json());
app.get("/api/health", (req, res) => {
  res.json({ status: "Server is working fine" });
});
app.get("/api/info", (req, res) => {
  res.send("Welcome to NOTED API");
});
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
