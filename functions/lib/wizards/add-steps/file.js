"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.askForFile = void 0;
const helpers_1 = require("../helpers");
const start_date_1 = require("./start-date");
class IncorrectMessageError extends Error {
}
async function askForFile(ctx) {
    await ctx.replyWithMarkdown('Загрузите файл');
}
exports.askForFile = askForFile;
async function stepFileHandler(ctx) {
    try {
        if (!ctx.message || !('photo' in ctx.message)) {
            throw new IncorrectMessageError('⛔️ Неправильный файл.');
        }
        try {
            const photo = ctx.message.photo[0];
            const url = await ctx.telegram.getFileLink(photo.file_id);
            ctx.scene.session.add.file = photo.file_id;
            console.log(url);
        }
        catch (error) { }
        await (0, start_date_1.askForStartDate)(ctx);
        return ctx.wizard.next();
    }
    catch (error) {
        // @ts-ignore
        return (0, helpers_1.cancelSearchReply)(ctx, error.message);
    }
}
exports.default = stepFileHandler;
//# sourceMappingURL=file.js.map