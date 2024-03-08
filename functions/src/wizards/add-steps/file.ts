
import {TelegrafContext} from "../../types";
import { cancelSearchReply } from '../helpers';
import {askForStartDate} from "./start-date";

class IncorrectMessageError extends Error {}

export async function askForFile(ctx: TelegrafContext) {
  await ctx.replyWithMarkdown(
    'Загрузите файл'
  );
}

export default async function stepFileHandler(ctx: TelegrafContext) {
  try {
    if (!ctx.message || !('photo' in ctx.message)) {
      throw new IncorrectMessageError( '⛔️ Неправильный файл.');
    }

    try {
      const photo = ctx.message.photo[0];
      const url = await ctx.telegram.getFileLink(photo.file_id);
      ctx.scene.session.add.file = photo.file_id;
      console.log(url);
    } catch (error) {}

    await askForStartDate(ctx);
    return ctx.wizard.next();
  } catch (error) {
    // @ts-ignore
    return cancelSearchReply(ctx, error.message);
  }
}