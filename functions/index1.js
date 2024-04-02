
const {Telegraf} = require("telegraf");
const functions = require("firebase-functions");
const {Markup} = require("telegraf");

const bot = new Telegraf(functions.config().telegrambot.key);

bot.command("start", (ctx) => {
  ctx.reply(
      "Добро пожаловать! Нажмите на кнопку ниже, чтобы запустить приложение",
      Markup.keyboard([
        Markup.button.webApp('Отправить сообщение', 'tet.de'),
      ]),
  );
});

exports.bot = functions.https.onRequest((req, res) => {
  bot.handleUpdate(req.body, res);
});
