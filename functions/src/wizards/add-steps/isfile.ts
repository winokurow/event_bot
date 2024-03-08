import {TelegrafContext} from "../../types";
import {Composer, Markup} from "telegraf";
import {askForFile} from "./file";
import {askForStartDate} from "./start-date";

export enum STEP_ISFILE_ACTIONS {
  YES = 'action_yes',
  NO = 'action_no'
}

export async function askForIsFile(ctx: TelegrafContext) {
  await ctx.replyWithMarkdown(
    'Хотите добавить картинку?',
    Markup.inlineKeyboard([
      Markup.button.callback('Да', STEP_ISFILE_ACTIONS.YES),
      Markup.button.callback('Нет', STEP_ISFILE_ACTIONS.NO)
    ])
  );
}

const stepIsFileHandler = new Composer<TelegrafContext>();
stepIsFileHandler.action(STEP_ISFILE_ACTIONS.YES, async (ctx) => {
  await askForFile(ctx);
  return ctx.wizard.next();

});
stepIsFileHandler.action(STEP_ISFILE_ACTIONS.NO, async (ctx) => {
  ctx.scene.session.add.multiday = false;
  await askForStartDate(ctx);
  return ctx.wizard.selectStep(ctx.wizard.cursor + 2);
});
stepIsFileHandler.use((ctx) =>
  ctx.replyWithMarkdown('⛔️ Неправильное значение.')
);

export default stepIsFileHandler;