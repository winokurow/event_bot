import {TelegrafContext} from "../../types";
import {cancelSearchReply} from "../helpers";
import {askForMultiday} from "./multiday";

class IncorrectMessageError extends Error {}

export async function askForStartDate(ctx: TelegrafContext) {
  await ctx.replyWithMarkdown(
    'Введите дату начала в формате DD.MM.YYYY hh:mm Например 20.11.2024 12:23'
  );
}

export async function stepStartDateHandler(ctx: TelegrafContext) {
  try {

    if (!ctx.message || !('text' in ctx.message)) {
      throw new IncorrectMessageError( '⛔️ Неправильная дата.');
    }
    const startDate = parseDateString(ctx.message.text)
    ctx.scene.session.add.startDate = startDate;
    await askForMultiday(ctx);
    return ctx.wizard.next();
  } catch (error) {
    // @ts-ignore
    return cancelSearchReply(ctx, error.message);
  }
}

function parseDateString(input: string): Date {
  const dateParts = input.match(/^(\d{2}).(\d{2}).(\d{4}) (\d{2}):(\d{2})$/);
try {
  if (!dateParts) {
    // If the input string doesn't match the expected format, return null
    throw new IncorrectMessageError( '⛔️ Неправильная дата.');
  }

  const [, day, month, year, hours, minutes] = dateParts.map(Number);

  // Months in JavaScript's Date object are zero-indexed, so subtract 1 from the month
  const parsedDate = new Date(year, month - 1, day, hours, minutes);

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

export default stepStartDateHandler;