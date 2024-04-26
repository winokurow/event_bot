import { Markup } from 'telegraf';
import {TelegrafContext} from "../types";
import {SEARCH_WIZARD_TYPE} from "../wizards/search";

// @ts-ignore
export default async function searchAction(ctx: TelegrafContext) {
  try {
  const messageIntro =  `🔍 Для поиска необходимо ввести критерии поиска. Итак начнём.\n\nЧтобы выйти из поиска воспользуйтесь командой  /cancel`;
  await ctx.reply(messageIntro);

  // Enter to wizard
  return await ctx.scene.enter(SEARCH_WIZARD_TYPE);
} catch (error) {
  console.log('scene' + ctx.scene);
  console.log(error);
  return ctx.replyWithMarkdown('🆘 *Ошибка*.', Markup.removeKeyboard());
}
}