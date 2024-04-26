import {TelegrafContext} from "../../types";
import {cancelSearchReply} from "../helpers";
import {DbInstance} from "../../services/db/DbInstance";

class IncorrectMessageError extends Error {}

export async function askForSearchEndDate(ctx: TelegrafContext) {
  await ctx.replyWithMarkdown(
    'По какую дату искать? (в формате DD.MM.YYYY Например 21.11.2024):'
  );
}

export default async function stepSearchEndDateHandler(ctx: TelegrafContext) {
  try {

    if (!ctx.message || !('text' in ctx.message)) {
      throw new IncorrectMessageError('⛔️ Неправильная дата.');
    }
    ctx.scene.session.search.endDate = parseDateString(ctx.message.text);
    const events = await DbInstance.getInstance().findEvents(ctx);

    for (const event of events) {
      if (event.file) {
        await ctx.replyWithPhoto(event.file)
      }
      const options: Intl.DateTimeFormatOptions = {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      };
      let message: string = "<b>Что?</b> "
        +  event.name + "\n<b>Когда?</b> "
        + event.startDate?.toLocaleDateString('de', options) + "\n<b>Где?</b> "
        + event.location + "\n"
        + event.description;
      await ctx.replyWithHTML(
        message
      );
    }
    return ctx.scene.leave();
  } catch (error) {
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