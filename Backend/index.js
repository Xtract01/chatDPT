const express = require("express");
const dotenv = require("dotenv");
const app = express();
dotenv.config();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to the ChatGPT Clone ");
});

app.post("/chat", (req, res) => {
  const { message } = req.body;
  res.json({ reply: `You said: ${message}` });
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is running on port ${process.env.PORT || 5000}`);
});
