
import {TelegrafContext} from "../../types";
import { cancelSearchReply } from '../helpers';
import {askForIsFile} from "./isfile";
class IncorrectMessageError extends Error {}

export default async function stepNameHandler(ctx: TelegrafContext) {
  try {
    if (!ctx.message || !('text' in ctx.message) || ctx.message.text.length < 2) {
      throw new IncorrectMessageError( '⛔️ Неправильное название.');
    }

    try {
      ctx.scene.session.add.name = ctx.message.text;
    } catch (error) {}

    await askForIsFile(ctx);
    return ctx.wizard.next();
  } catch (error) {
    // @ts-ignore
    return cancelSearchReply(ctx, error.message);
  }
}