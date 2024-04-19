require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// https://www.youtube.com/watch?v=YJvXHr69AHg

const playerRouter = require("./routes/player");

app.use(express.json());
app.use("/player", playerRouter);

app.get("/", (req, res) => {
  res.send(
    "<h1>Node.js CRUD API</h1> <h4>Message: Success</h4><p>Version: 1.0</p>"
  );
});

app.get("/health", (req, res) => {
  res.send();
});

// Run server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
