import {TelegrafContext} from "../../types";
import {Composer, Markup} from "telegraf";

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
  ctx.reply(
    'Добавляем новое мероприятие'
  );
  let file: string = ctx.scene.session.add.file ?? "";
  ctx.reply(
    'test' + file
  );
  await ctx.telegram.sendPhoto("-1002057575845",
    file,
    { reply_to_message_id: 2});
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
});
stepIsAddToChannelHandler.action(STEP_ISADDTOCHANNEL_ACTIONS.NO, async (ctx) => {
  await ctx.replyWithMarkdown(
    `✅ Спасибо за интересную информацию`,
    Markup.removeKeyboard()
  );
  return ctx.scene.leave();
});
stepIsAddToChannelHandler.use((ctx) =>
  ctx.replyWithMarkdown('⛔️ Неправильное значение.')
);

export default stepIsAddToChannelHandler;