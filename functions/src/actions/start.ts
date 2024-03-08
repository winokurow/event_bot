
import { Markup } from 'telegraf';
import {GLOBAL_ACTIONS, TelegrafContext} from "../types";

export default function startAction(ctx: TelegrafContext) {

  const message = `*Привет, ${ctx.from?.first_name || ctx.from?.username}* 👋 

   Добро пожаловать! Это телеграм бот для обмена информацией об интересной информацией об мероприятиях в городе Нюрнберг и окрестностях.
   Для начала поиска выполни команду /search или нажми кнопку нижe
   Что бы поделиться информацией об интересном мероприятии выполни команду /add или нажми кнопку нижe
    `;


  const chatId = ctx.from?.id;

  if (chatId) {
    /*addChat(chatId, {
      firstName: ctx.from?.first_name || '',
      lastName: ctx.from?.last_name || '',
      username: ctx.from?.username || '',
      language: ctx.from?.language_code || '',
    });*/
  }

  return ctx.replyWithMarkdown(
    message,
    Markup.inlineKeyboard(
      [
        Markup.button.callback('Поиск', GLOBAL_ACTIONS.search),
        Markup.button.callback('Добавить', GLOBAL_ACTIONS.add),
      ],
      {
        columns: 2,
      }
    )
  );
}