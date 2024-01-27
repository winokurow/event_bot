const { Telegraf } = require('telegraf');
const {Markup} = require('telegraf');
const functions = require('firebase-functions');

const bot = new Telegraf(functions.config().telegrambot.key);



bot.hears('hi', (ctx) => ctx.reply('Hey there'));


bot.command('events', async (ctx) =>
  await ctx.reply('События в Нюрнберге:', Markup
    .inlineKeyboard([
      Markup.button.callback('Посмотреть', 'getEvents'),
      Markup.button.callback('Добавить', 'addEvent')])
  )
);

bot.command('test', async (ctx) => await ctx.reply('Command invoked'));

bot.launch();

exports.bot = functions.https.onRequest((req, res) => {
  console.log('trdz')
  bot.handleUpdate(req.body, res);
})