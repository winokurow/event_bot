import {Telegraf, Markup} from 'telegraf';
// Read ENV variablesS
import {TelegrafContext} from "./types";
import {BOT_TOKEN} from "./config";
import {onRequest} from "firebase-functions/v1/https";
import {initActions} from "./actions";
import {initWizards} from "./wizards";
//import * as functions from 'firebase-functions';
const bot = new Telegraf<TelegrafContext>(BOT_TOKEN);

bot.use((ctx, next) => {
  // @ts-ignore
  const chatType = ctx.chat.type; // Get the type of chat

  // If the message is from a private chat, proceed
  if (chatType !== 'supergroup') {
    return next();
  } else {
    // Ignore the message if it's from a group or channel
    return;
  }
});


initWizards(bot);
initActions(bot);


bot.command('events', async (ctx) =>
  await ctx.reply('События в Нюрнберге:', Markup
    .inlineKeyboard([
      Markup.button.callback('Посмотреть', 'getEvents'),
      Markup.button.callback('Добавить', 'addEvent')])
  )
);

bot.catch(async (err, ctx) => {
  console.error(err);
  await ctx.reply('An error occurred.');
});


exports.bot = onRequest( (req, res) => {
  //functions.logger.log("+++Start handler");
  //functions.logger.log("req.body")
  try {
    bot.handleUpdate(req.body, res);
  } catch (e) {
    console.log('cant handle message', e)
  }


  //functions.logger.log("---End handler");
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