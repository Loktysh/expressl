const express = require('express');
const fetch = require('node-fetch');
const cheerio = require('cheerio');
const app = express()
const port = process.env.PORT || 3000;
var TelegramBot = require('node-telegram-bot-api');
var token = '1016574486:AAFP1RxH-o5ex7g6a0MdI572JhjbmVDJiU8';
var bot = new TelegramBot(token, { polling: true });
var priceURL = 'https://catalog.onliner.by/ssd/westerndigital/wds200t1x0e';

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

function getPrice () {
  console.log('Start getting')
  fetch(priceURL)
  .then(res => res.text())
  .then(text => {
    var $ = cheerio.load(text);
    title = $(".catalog-masthead__title").text().trim();
    bot.sendMessage(process.env.tgid, `${title}`);
  })
}
setInterval(() => getPrice(), 60000);