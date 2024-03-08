import { STEP_BEDROOMS_MORE_ACTIONS } from '../types';
import {Composer, Markup} from "telegraf";
import {TelegrafContext} from "../../types";


const stepBedroomsMoreHandler = new Composer<TelegrafContext>();
stepBedroomsMoreHandler.action(STEP_BEDROOMS_MORE_ACTIONS.YES, async (ctx) => {
  ctx.scene.session.search.roomsMore = true;
  await ctx.replyWithMarkdown('*Step 3* 💷 What is your monthly budget?', Markup.removeKeyboard());
  return ctx.wizard.next();
});
stepBedroomsMoreHandler.action(STEP_BEDROOMS_MORE_ACTIONS.NO, async (ctx) => {
  ctx.scene.session.search.roomsMore = false;
  await ctx.replyWithMarkdown('*Step 3* 💷 What is your monthly budget?', Markup.removeKeyboard());
  return ctx.wizard.next();
});
stepBedroomsMoreHandler.use((ctx) =>
  ctx.replyWithMarkdown('⛔️ *Pardon*, please select item from menu.')
);

export default stepBedroomsMoreHandler;