import {Telegraf, Markup} from 'telegraf';
// Read ENV variablesS
import {TelegrafContext} from "./types";
import {BOT_TOKEN} from "./config";
import {onRequest} from "firebase-functions/v1/https";

const bot = new Telegraf<TelegrafContext>(BOT_TOKEN);

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

exports.bot = onRequest((req, res) => {
  console.log('trdz')
  bot.handleUpdate(req.body, res);
})