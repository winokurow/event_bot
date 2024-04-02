import { Telegraf } from 'telegraf';
import actionHelp from './help';
import actionSearch from './search';
import actionAdd from './add';
import {GLOBAL_ACTIONS, TelegrafContext} from "../types";

export function initActions(bot: Telegraf<TelegrafContext>) {
  //bot.start(actionStart);
  bot.help(actionHelp);
  bot.settings((ctx) => {
    ctx.setMyCommands([
      {
        command: GLOBAL_ACTIONS.search,
        description: '🔍 Начать новый поиск',
      },
      {
        command: GLOBAL_ACTIONS.add,
        description: '🌍 Поделиться информацией',
      },
    ]);
  });

  bot.command(GLOBAL_ACTIONS.search, actionSearch);
  bot.command(GLOBAL_ACTIONS.add, actionAdd);

  bot.action(GLOBAL_ACTIONS.search, actionSearch);
  bot.action(GLOBAL_ACTIONS.add, actionAdd);
}