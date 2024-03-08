import { Markup } from 'telegraf';
import {TelegrafContext} from "../types";
import {SEARCH_WIZARD_TYPE} from "../wizards";

// @ts-ignore
export default async function searchAction(ctx: TelegrafContext) {
  const message =  `🔍 Для поиска вы должны ввести критерии поиска. Итак начнём.\n\nЧтобы выйти из поиска воспользуйтесь командой  /cancel`;
  const chatId = ctx.from?.id;

  if (chatId) {
    // Save new chat to database
    /*updateChat(chatId, {
      firstName: ctx.from?.first_name || '',
      lastName: ctx.from?.last_name || '',
      username: ctx.from?.username || '',
      language: ctx.from?.language_code || '',
    });*/

    try {
      /*const activeSearches = await getSearches(chatId);
      ctx.session.activeSearches = activeSearches;

      if (activeSearches && Object.keys(activeSearches).length >= MAX_SEARCHES) {
        // Do not allow more searches
        return ctx.replyWithMarkdown(
          ctx.i18n.t('error.maxSearchesReached', {
            maxSearches: MAX_SEARCHES,
          }),
          Markup.inlineKeyboard([
            Markup.button.callback('📝 My Searches', GLOBAL_ACTIONS.searches),
          ])
        );
      } else {*/
        await ctx.replyWithMarkdown(message, Markup.removeKeyboard());

        // Enter to wizard
        return await ctx.scene.enter(SEARCH_WIZARD_TYPE);
      //}
    } catch (error) {
      console.log('scene' + ctx.scene);
      console.log(error);
    }
  } else {
    return ctx.replyWithMarkdown('🆘 *Ошибка*. Чат не найден.', Markup.removeKeyboard());
  }
}