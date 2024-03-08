import {TelegrafContext} from "../../types";
import {Composer, Markup} from "telegraf";
import {askForEndDate} from "./end-date";
import {askForLocation} from "./location";

export enum STEP_MULTIDAY_ACTIONS {
  YES = 'action_yes',
  NO = 'action_no'
}

export async function askForMultiday(ctx: TelegrafContext) {
  await ctx.replyWithMarkdown(
    'Событие многодневное?',
    Markup.inlineKeyboard([
      Markup.button.callback('Да', STEP_MULTIDAY_ACTIONS.YES),
      Markup.button.callback('Нет', STEP_MULTIDAY_ACTIONS.NO)
    ])
  );
}

const stepMultidayHandler = new Composer<TelegrafContext>();
stepMultidayHandler.action(STEP_MULTIDAY_ACTIONS.YES, async (ctx) => {
  ctx.scene.session.add.multiday = true;
  await askForEndDate(ctx);
  return ctx.wizard.next();

});
stepMultidayHandler.action(STEP_MULTIDAY_ACTIONS.NO, async (ctx) => {
  ctx.scene.session.add.multiday = false;
  await askForLocation(ctx);
  return ctx.wizard.selectStep(ctx.wizard.cursor + 2);
});
stepMultidayHandler.use((ctx) =>
  ctx.replyWithMarkdown('⛔️ Неправильное значение.')
);

export default stepMultidayHandler;