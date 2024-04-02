import { Markup } from 'telegraf';
import { ACTIONS } from './types';
import {TelegrafContext} from "../types";

export const cancelSearchReply = async (ctx: TelegrafContext, message: string) => {
  return ctx.replyWithMarkdown(
    message,
    Markup.inlineKeyboard([
      Markup.button.callback('Cancel', ACTIONS.CANCEL),
    ])
  );
};