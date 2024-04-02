import {TelegrafContext} from "../../types";
import {Composer, Markup} from "telegraf";
import {cancelSearchReply} from "../helpers";

export enum STEP_ISADDTOCHANNEL_ACTIONS {
  YES = 'action_yes',
  NO = 'action_no'
}

export async function askForIsAddToChannel(ctx: TelegrafContext) {
  await ctx.replyWithMarkdown(
    'Запостить в канал?',
    Markup.inlineKeyboard([
      Markup.button.callback('Да', STEP_ISADDTOCHANNEL_ACTIONS.YES),
      Markup.button.callback('Нет', STEP_ISADDTOCHANNEL_ACTIONS.NO)
    ])
  );
}

const stepIsAddToChannelHandler = new Composer<TelegrafContext>();
stepIsAddToChannelHandler.action(STEP_ISADDTOCHANNEL_ACTIONS.YES, async (ctx) => {
  try {
    ctx.reply(
      'Добавляем новое мероприятие'
    );

    if (ctx.scene.session.add.file) {
      await ctx.telegram.sendPhoto("-1002057575845",
        ctx.scene.session.add.file,
        {reply_to_message_id: 2});
      await ctx.telegram.sendPhoto("-1001786826235",
        ctx.scene.session.add.file);
    }
    const options: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    };
    let message: string = "<b>Что?</b> "
      + ctx.scene.session.add.name + "\n<b>Когда?</b> "
      + ctx.scene.session.add.startDate?.toLocaleDateString('de', options) + "\n<b>Где?</b> "
      + ctx.scene.session.add.location + "\n"
      + ctx.scene.session.add.description;
    await ctx.telegram.sendMessage("-1002057575845",
      message,
      {
        reply_to_message_id: 2,
        parse_mode: "HTML"
      });
    await ctx.telegram.sendMessage("-1001786826235",
      message,
      {parse_mode: "HTML"});
    await ctx.replyWithMarkdown(
      `✅ Спасибо за интересную информацию`,
      Markup.removeKeyboard()
    );
    return ctx.scene.leave();
  }
  catch (error) {
      // @ts-ignore
      return cancelSearchReply(ctx, error.message);
    }
});
stepIsAddToChannelHandler.action(STEP_ISADDTOCHANNEL_ACTIONS.NO, async (ctx) => {
  try {
  ctx.reply(
    'Добавляем новое мероприятие'
  );
    if (ctx.scene.session.add.file) {
      await ctx.telegram.sendPhoto("-1002057575845",
        ctx.scene.session.add.file,
        {reply_to_message_id: 2});
    }
  const options: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  };
  let message: string = "<b>Что?</b> "
    +  ctx.scene.session.add.name + "\n<b>Когда?</b> "
    + ctx.scene.session.add.startDate?.toLocaleDateString('de', options) + "\n<b>Где?</b> "
    + ctx.scene.session.add.location + "\n"
    + ctx.scene.session.add.description;
  await ctx.telegram.sendMessage("-1002057575845",
    message,
    { reply_to_message_id: 2,
      parse_mode: "HTML"});
  await ctx.replyWithMarkdown(
    `✅ Спасибо за интересную информацию`,
    Markup.removeKeyboard()
  );
  return ctx.scene.leave();
  }
  catch (error) {
    // @ts-ignore
    return cancelSearchReply(ctx, error.message);
  }
});
stepIsAddToChannelHandler.use((ctx) =>
  ctx.replyWithMarkdown('⛔️ Неправильное значение.')
);

export default stepIsAddToChannelHandler;