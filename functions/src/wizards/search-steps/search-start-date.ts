import {TelegrafContext} from "../../types";
import {cancelSearchReply} from "../helpers";
import {askForSearchEndDate} from "./search-end-date";

class IncorrectMessageError extends Error {}



export default async function stepSearchStartDateHandler(ctx: TelegrafContext) {
  try {

    if (!ctx.message || !('text' in ctx.message)) {
      throw new IncorrectMessageError( '⛔️ Неправильная дата.');
    }
    let text = ctx.message.text;
    let startDate = parseDateString(text);
    await ctx.replyWithMarkdown(
      JSON.stringify(startDate)
    );
    ctx.scene.session.search.startDate = startDate;

    await askForSearchEndDate(ctx);
    return ctx.wizard.next();
  } catch (error) {
    // @ts-ignore
    await ctx.replyWithMarkdown(
      'here'
    );
    // @ts-ignore
    return cancelSearchReply(ctx, error.message);
  }
}

function parseDateString(input: string): Date {
  const dateParts = input.match(/^(\d{2}).(\d{2}).(\d{4})$/);
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
}