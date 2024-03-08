import {TelegrafContext} from "../types";
import {ADD_WIZARD_TYPE} from "../wizards/add";
import {Markup} from "telegraf";

export default async function addAction(ctx: TelegrafContext) {
  try {
  const messageIntro = `Ввод нового мероприятия. Итак начнём.\n\nЧтобы выйти из поиска воспользуйтесь командой  /cancel`;
  await ctx.reply(messageIntro);

  // Enter to wizard
  return await ctx.scene.enter(ADD_WIZARD_TYPE);
  } catch (error) {
    console.log('scene' + ctx.scene);
    console.log(error);
    return ctx.replyWithMarkdown('🆘 *Ошибка*.', Markup.removeKeyboard());
  }
}