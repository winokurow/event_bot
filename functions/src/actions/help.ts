import {TelegrafContext} from "../types";


export default function startAction(ctx: TelegrafContext) {
  const message = 'Вам доступны следующие команды:';
  return ctx.reply(message);
}