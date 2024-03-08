"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.askForIsAddToChannel = exports.STEP_ISADDTOCHANNEL_ACTIONS = void 0;
const telegraf_1 = require("telegraf");
var STEP_ISADDTOCHANNEL_ACTIONS;
(function (STEP_ISADDTOCHANNEL_ACTIONS) {
    STEP_ISADDTOCHANNEL_ACTIONS["YES"] = "action_yes";
    STEP_ISADDTOCHANNEL_ACTIONS["NO"] = "action_no";
})(STEP_ISADDTOCHANNEL_ACTIONS || (exports.STEP_ISADDTOCHANNEL_ACTIONS = STEP_ISADDTOCHANNEL_ACTIONS = {}));
async function askForIsAddToChannel(ctx) {
    await ctx.replyWithMarkdown('Запостить в канал?', telegraf_1.Markup.inlineKeyboard([
        telegraf_1.Markup.button.callback('Да', STEP_ISADDTOCHANNEL_ACTIONS.YES),
        telegraf_1.Markup.button.callback('Нет', STEP_ISADDTOCHANNEL_ACTIONS.NO)
    ]));
}
exports.askForIsAddToChannel = askForIsAddToChannel;
const stepIsAddToChannelHandler = new telegraf_1.Composer();
stepIsAddToChannelHandler.action(STEP_ISADDTOCHANNEL_ACTIONS.YES, async (ctx) => {
    var _a, _b;
    ctx.reply('Добавляем новое мероприятие');
    let file = (_a = ctx.scene.session.add.file) !== null && _a !== void 0 ? _a : "";
    ctx.reply('test' + file);
    await ctx.telegram.sendPhoto("-1002057575845", file, { reply_to_message_id: 2 });
    const options = {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
    };
    let message = "<b>Что?</b> "
        + ctx.scene.session.add.name + "\n<b>Когда?</b> "
        + ((_b = ctx.scene.session.add.startDate) === null || _b === void 0 ? void 0 : _b.toLocaleDateString('de', options)) + "\n<b>Где?</b> "
        + ctx.scene.session.add.location + "\n"
        + ctx.scene.session.add.description;
    await ctx.telegram.sendMessage("-1002057575845", message, { reply_to_message_id: 2,
        parse_mode: "HTML" });
    await ctx.replyWithMarkdown(`✅ Спасибо за интересную информацию`, telegraf_1.Markup.removeKeyboard());
    return ctx.scene.leave();
});
stepIsAddToChannelHandler.action(STEP_ISADDTOCHANNEL_ACTIONS.NO, async (ctx) => {
    await ctx.replyWithMarkdown(`✅ Спасибо за интересную информацию`, telegraf_1.Markup.removeKeyboard());
    return ctx.scene.leave();
});
stepIsAddToChannelHandler.use((ctx) => ctx.replyWithMarkdown('⛔️ Неправильное значение.'));
exports.default = stepIsAddToChannelHandler;
//# sourceMappingURL=isAddToChannel.js.map