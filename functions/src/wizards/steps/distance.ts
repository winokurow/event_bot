import { Markup, Composer } from 'telegraf';

import { askForBedrooms } from './bedrooms';
import {TelegrafContext} from "../../types";

export enum STEP_DISTANCE_ACTIONS {
  MILE_1_4 = 'action_mile_1_4',
  MILE_1_2 = 'action_mile_1_2',
  MILE_1 = 'action_mile_1',
}

export async function askForDistance(ctx: TelegrafContext) {
  await ctx.replyWithMarkdown(
    'By default i increase distance to your search area plus ¼ mile, if you want to change it, please, select option below.',
    Markup.inlineKeyboard([
      Markup.button.callback('Plus ¼ mile', STEP_DISTANCE_ACTIONS.MILE_1_4),
      Markup.button.callback('Plus ½ mile', STEP_DISTANCE_ACTIONS.MILE_1_2),
      Markup.button.callback('Plus 1 mile', STEP_DISTANCE_ACTIONS.MILE_1),
    ])
  );
}

const stepDistanceHandler = new Composer<TelegrafContext>();
stepDistanceHandler.action(STEP_DISTANCE_ACTIONS.MILE_1_4, async (ctx) => {
  //ctx.scene.session.search.distance = MILES.MILE_1_4;
  askForBedrooms(ctx);
  return ctx.wizard.next();
});
stepDistanceHandler.action(STEP_DISTANCE_ACTIONS.MILE_1_2, async (ctx) => {
  //ctx.scene.session.search.distance = MILES.MILE_1_2;
  askForBedrooms(ctx);
  return ctx.wizard.next();
});
stepDistanceHandler.action(STEP_DISTANCE_ACTIONS.MILE_1, async (ctx) => {
  //ctx.scene.session.search.distance = MILES.MILE_1;
  askForBedrooms(ctx);
  return ctx.wizard.next();
});
stepDistanceHandler.use((ctx) =>
  ctx.replyWithMarkdown('⛔️ *Pardon*, incorrect distance value.')
);

export default stepDistanceHandler;