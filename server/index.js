const TelegramBot = require("node-telegram-bot-api");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const tg_api = "6060775882:AAGzYWzB1ahahW5Z6EHtv9tcrWPayNTJ_Eo";
const PORT = 5000;
const app = express();

// Add headers before the routes are defined

app.use(cors());
app.use(bodyParser.json());

const bot = new TelegramBot(tg_api, { polling: true });
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);

  next();
});

app.post("/result", (req, res) => {
  const chatId = 893653802;

  const { name, time, score, category, amount } = req.body;
  bot.sendMessage(chatId, `Name: ${name}\nScore: ${score} \nTime: ${time} \nCategory: ${category}\nAmount: ${amount}`);

  res.status(200).json({ msg: "Success" });
});

bot.on("message", (msg) => {
  const text = msg.text;
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, `${"hello!"}`);
  console.log(msg);
});
app.listen(PORT, console.log(`Server has a been started on port:${PORT}`));
