"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("../helpers");
const telegraf_1 = require("telegraf");
class IncorrectMessageError extends Error {
}
const DbInstance_1 = require("../../services/db/DbInstance");
async function stepPostToChannelHandler(ctx) {
    try {
        if (!ctx.message || !('text' in ctx.message) || ctx.message.text.length < 2) {
            throw new IncorrectMessageError('⛔️ Неправильное название.');
        }
        try {
            ctx.scene.session.add.description = ctx.message.text;
        }
        catch (error) { }
        try {
            await DbInstance_1.DbInstance.getInstance().addEvent(ctx);
        }
        catch (error) {
            console.error('Error saving data:', error);
        }
        await ctx.replyWithMarkdown(`✅ Спасибо за интересную информацию`, telegraf_1.Markup.removeKeyboard());
        return ctx.scene.leave();
    }
    catch (error) {
        console.log(error);
        // @ts-ignore
        return (0, helpers_1.cancelSearchReply)(ctx, error.message);
    }
}
exports.default = stepPostToChannelHandler;
//# sourceMappingURL=postToChannel.js.map