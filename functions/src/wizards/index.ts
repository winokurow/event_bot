import {Telegraf, Scenes, session} from 'telegraf';
import {TelegrafContext} from "../types";
import {ACTIONS} from "./types";
import searchWizard from './search';
import addWizard from './add';

export function initWizards(bot: Telegraf<TelegrafContext>) {

  const stage = new Scenes.Stage<TelegrafContext>([searchWizard, addWizard]);
  stage.action(ACTIONS.CANCEL, (ctx) => {
    ctx.reply('ℹ️ Operation canceled');
    return ctx.scene.leave();
  });

  stage.command(ACTIONS.CANCEL, (ctx) => {
    ctx.reply('ℹ️ Operation canceled');
    return ctx.scene.leave();
  });
  bot.use(session()); // Session middleware
  bot.use(stage.middleware()); // Stage middleware
}