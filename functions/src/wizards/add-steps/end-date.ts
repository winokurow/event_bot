import {TelegrafContext} from "../../types";
import {cancelSearchReply} from "../helpers";
import {askForLocation} from "./location";

class IncorrectMessageError extends Error {}

export async function askForEndDate(ctx: TelegrafContext) {
  ctx.replyWithMarkdown(
    'Введите дату конца мероприятия в формате DD.MM.YYYY Например 20.11.2024'
  );
}

export async function stepEndDateHandler(ctx: TelegrafContext) {
  try {
    if (ctx.scene.session.add.multiday) {
      if (!ctx.message || !('text' in ctx.message)) {
        throw new IncorrectMessageError('⛔️ Неправильная дата.');
      }
      const endDate = parseDateString(ctx.message.text)
      try {
        ctx.scene.session.add.endDate = endDate;
      } catch (error) {
      }
    }
    await askForLocation(ctx);
    return ctx.wizard.next();
  }
  catch
    (error)
    {
      // @ts-ignore
      return cancelSearchReply(ctx, error.message);
    }
}

function parseDateString(input: string): Date {
  const dateParts = input.match(/^(\d{2}).(\d{2}).(\d{4})$/);
  try {
    if (!dateParts) {
      // If the input string doesn't match the expected format, return null
      throw new IncorrectMessageError( '⛔️ Неправильная дата.');
    }

    const [, day, month, year] = dateParts.map(Number);

    // Months in JavaScript's Date object are zero-indexed, so subtract 1 from the month
    const parsedDate = new Date(year, month - 1, day);

    // Check if the parsed date is valid
    if (isNaN(parsedDate.getTime())) {
      throw new IncorrectMessageError( '⛔️ Неправильная дата.');
    }

    return parsedDate;
  } catch (error) {
    // @ts-ignore
    return cancelSearchReply(ctx, error.message);
  }
}

export default stepEndDateHandler;