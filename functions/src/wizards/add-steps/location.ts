
import {TelegrafContext} from "../../types";
import { cancelSearchReply } from '../helpers';
import {askForDescription} from "./description";
class IncorrectMessageError extends Error {}

export async function askForLocation(ctx: TelegrafContext) {
  await ctx.replyWithMarkdown(
    'Введите место проведения'
  );
}

export default async function stepLocationHandler(ctx: TelegrafContext) {
  try {
    if (!ctx.message || !('text' in ctx.message) || ctx.message.text.length < 2) {
      throw new IncorrectMessageError( '⛔️ Неправильное название.');
    }

    try {
      ctx.scene.session.add.location = ctx.message.text;
    } catch (error) {}

    await askForDescription(ctx);
    return ctx.wizard.next();
  } catch (error) {
    // @ts-ignore
    return cancelSearchReply(ctx, error.message);
  }
}