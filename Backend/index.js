import express from "express";
import dotenv from "dotenv";
import { generate } from "./chatBot.js";
import cors from "cors";
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Welcome to the ChatGPT Clone ");
});

app.post("/chat", async (req, res) => {
  const { message } = req.body;
  const reply = await generate(message);
  res.json({ reply: reply });
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is running on port ${process.env.PORT || 5000}`);
});
