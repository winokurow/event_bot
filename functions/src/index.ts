import {Telegraf, Markup} from 'telegraf';
// Read ENV variablesS
import {TelegrafContext} from "./types";
import {BOT_TOKEN} from "./config";
import {onRequest} from "firebase-functions/v1/https";
import {initActions} from "./actions";
import {initWizards} from "./wizards";

const bot = new Telegraf<TelegrafContext>(BOT_TOKEN);

initWizards(bot);
initActions(bot);
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
  bot.handleUpdate(req.body, res);
})

/*export const saveDataToFirestore = functions.https.onRequest(async (req, res) => {
  try {
    // Get data from request
    const data = req.body;

    // Save data to Firestore
    await db.collection('your_collection_name').add(data);

    // Respond with success message
    res.status(200).send('Data saved successfully');
  } catch (error) {
    // Handle error
    console.error('Error saving data:', error);
    res.status(500).send('Error saving data');
  }
});*/