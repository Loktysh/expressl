const express = require("express");
const wakeDyno = require("woke-dyno");
const fetch = require("node-fetch");
const cheerio = require("cheerio");
const cron = require("node-cron");
const app = express();
const port = process.env.PORT || 3000;
var TelegramBot = require("node-telegram-bot-api");
var token = "1016574486:AAFP1RxH-o5ex7g6a0MdI572JhjbmVDJiU8";
var bot = new TelegramBot(token, { polling: true });
var priceURL = "https://catalog.onliner.by/ssd/westerndigital/wds200t1x0e";
let counter = 0;

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
  // wakeDyno({
  //   url: 'https://expressl.herokuapp.com/',
  //   interval: 1200000,
  //   startNap: [21, 0, 0, 0],
  //   endNap: [5, 0, 0, 0],
  // }).start();
});

cron.schedule(`*/${process.env.timer} * * * *`, () => {
  fetch(priceURL)
    .then((res) => res.text())
    .then((text) => {
      counter = counter + 1;
      var $ = cheerio.load(text);
      title = $(".catalog-masthead__title").text().trim();
      bot.sendMessage(process.env.tgid, `${title}`);
      console.log("Time: ", new Date(), 'Count: ', counter);
    });
});
