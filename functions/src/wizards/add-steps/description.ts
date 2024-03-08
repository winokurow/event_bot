
import {TelegrafContext} from "../../types";
import { cancelSearchReply } from '../helpers';
class IncorrectMessageError extends Error {}
import {DbInstance} from "../../services/db/DbInstance";
import {askForIsAddToChannel} from "./isAddToChannel";


export async function askForDescription(ctx: TelegrafContext) {
  await ctx.replyWithMarkdown(
    'Введите описание'
  );
}

export default async function stepDescriptionHandler(ctx: TelegrafContext) {
  try {
    if (!ctx.message || !('text' in ctx.message) || ctx.message.text.length < 2) {
      throw new IncorrectMessageError( '⛔️ Неправильное название.');
    }

    try {
      ctx.scene.session.add.description = ctx.message.text;
    } catch (error) {}

    try {
      DbInstance.getInstance().addEvent(ctx);
    }
    catch (error) {
      console.error('Error saving data:', error);
    }

    await askForIsAddToChannel(ctx);
    return ctx.wizard.next();

  } catch (error) {
    console.log(error);
    // @ts-ignore
    return cancelSearchReply(ctx, error.message);
  }
}