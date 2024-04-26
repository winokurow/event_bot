import {TelegrafContext} from "../types";


export default function startAction(ctx: TelegrafContext) {
  const message = 'Вам доступны следующие команды: /add для добавления нового события и /search для поиска по мероприятиям';
  return ctx.reply(message);
}