import {Scenes} from 'telegraf';
import {TelegrafContext} from "../types";
import stepNameHandler from './add-steps/name';
import startDateHandler from "./add-steps/start-date";
import {stepEndDateHandler} from "./add-steps/end-date";
import stepDescriptionHandler from "./add-steps/description";
import stepLocationHandler from "./add-steps/location";
import stepMultidayHandler from "./add-steps/multiday";
import stepIsFileHandler from "./add-steps/isfile";
import stepFileHandler from "./add-steps/file";
import stepIsAddToChannelHandler from "./add-steps/isAddToChannel";


export const ADD_WIZARD_TYPE = 'add-wizard';
export default new Scenes.WizardScene<TelegrafContext>(
  ADD_WIZARD_TYPE,
  async (ctx) => {

    ctx.scene.session.add = {};
    await ctx.replyWithMarkdown('Введите название:');
    return ctx.wizard.next();
  },
  stepNameHandler,
  stepIsFileHandler,
  stepFileHandler,
  startDateHandler,
  stepMultidayHandler,
  stepEndDateHandler,
  stepLocationHandler,
  stepDescriptionHandler,
  stepIsAddToChannelHandler
);