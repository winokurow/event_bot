import { Scenes } from 'telegraf';
import {TelegrafContext} from "../types";
import stepBedroomsMoreHandler from "./steps/bedrooms-more";

export const WIZARD_TYPE = 'search-wizard';
export default new Scenes.WizardScene<TelegrafContext>(
  WIZARD_TYPE,
  async (ctx) => {
    //const chatId = ctx.chat?.id;

    //ctx.scene.session.search = {
     // chatId,
    //};

    await ctx.replyWithMarkdown('*Step 1* 📍 Please enter your prefered location to search property. For example Islington, Arsenal station or N5.');
    return ctx.wizard.next();
  },
  stepBedroomsMoreHandler
  /*stepLocationHandler,
  stepDistanceHandler,
  // Ask to show bedrooms+
  async (ctx) => {
    if (
      ctx.message &&
      'text' in ctx.message &&
      AVAILABLE_BEDROOMS.indexOf(ctx.message.text) !== -1
    ) {
      ctx.scene.session.search.rooms = ctx.message.text;

      let text;

      if (ctx.scene.session.search.rooms === 'studio') {
        text = `Are you ok to see in search properties with more bedrooms than studio?`;
      } else {
        text = `Are you ok to see in search properties with more than *${ctx.scene.session.search.rooms}*?`;
      }

      await ctx.replyWithMarkdown(
        text,
        Markup.inlineKeyboard([
          Markup.button.callback('Yes, please', STEP_BEDROOMS_MORE_ACTIONS.YES),
          Markup.button.callback('Nope, please', STEP_BEDROOMS_MORE_ACTIONS.NO),
        ])
      );
      return ctx.wizard.next();
    } else {
      return cancelSearchReply(ctx,  '⛔️ *Pardon*, you entered wrong bedrooms values. Please choose from keyboard values.');
    }
  },
  stepBedroomsMoreHandler,
  async (ctx) => {
    if (
      ctx.message &&
      'text' in ctx.message &&
      Number(ctx.message.text) > 0 &&
      Number(ctx.message.text) < 10000
    ) {
      ctx.scene.session.search.budget = Number(ctx.message.text);

      await ctx.replyWithMarkdown(
        `✅ Thank you for provided information.\n\nI will help you to find *${ctx.scene.session.search.budget}
        properties in area *"${ctx.scene.session.search.area}"* `,
        Markup.removeKeyboard()
      );

      //const { search } = ctx.scene.session;

      /*if (search.chatId) {
        const searchRequest: ISearchRequestInput = {
          chatId: search.chatId,
          budget: search.budget || 0,
          area: search.area || '',
          zooplaAreaId: search.zooplaAreaId,
          roomsMore: Boolean(search.roomsMore),
          rooms: search.rooms || '1',
          distance: search.distance || MILES.MILE_1_4,
        };

        addSearch(searchRequest);
        let foundResults = 0;

        try {
          const searchResult = await getSearchResultsCount(
            getSearchString(searchRequest, '30_days')
          );

          foundResults = searchResult.totalResults;
        } catch (error) {}

        if (foundResults) {
          const url = getOpenSearchUrl(searchRequest, '30_days');

          await ctx.replyWithMarkdown(
            ctx.i18n.t('wizardSearch.foundResults', {
              count: foundResults,
            }),
            Markup.inlineKeyboard([
              Markup.button.url(ctx.i18n.t('openSearchResults'), url),
            ])
          );
        } else {
          await ctx.replyWithMarkdown(
            `🔍 ℹ️ At this moment i can not );find any 🏘 properties with your request. I will try to send new updated tomorrow.`,
            Markup.removeKeyboard()
          );
        //}
      //}

      return ctx.scene.leave();
    } else {
      return cancelSearchReply(ctx, '⛔️ *Pardon*, you entered wrong budget amount.');
    }
  }*/
);