import { Scenes } from 'telegraf';
import {TelegrafContext} from "../types";
import stepSearchStartDateHandler from "./search-steps/search-start-date";
import stepSearchEndDateHandler from "./search-steps/search-end-date";

export const SEARCH_WIZARD_TYPE = 'search-wizard';
export default new Scenes.WizardScene<TelegrafContext>(
  SEARCH_WIZARD_TYPE,
    async (ctx) => {

      ctx.scene.session.search = {};
      await ctx.replyWithMarkdown('С какой даты искать? (в формате DD.MM.YYYY Например 20.11.2024):');
      return ctx.wizard.next();
    },
    stepSearchStartDateHandler,
    stepSearchEndDateHandler
);
