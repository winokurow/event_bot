"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.askForIsFile = exports.STEP_ISFILE_ACTIONS = void 0;
const telegraf_1 = require("telegraf");
const file_1 = require("./file");
const start_date_1 = require("./start-date");
var STEP_ISFILE_ACTIONS;
(function (STEP_ISFILE_ACTIONS) {
    STEP_ISFILE_ACTIONS["YES"] = "action_yes";
    STEP_ISFILE_ACTIONS["NO"] = "action_no";
})(STEP_ISFILE_ACTIONS || (exports.STEP_ISFILE_ACTIONS = STEP_ISFILE_ACTIONS = {}));
async function askForIsFile(ctx) {
    await ctx.replyWithMarkdown('Хотите добавить картинку?', telegraf_1.Markup.inlineKeyboard([
        telegraf_1.Markup.button.callback('Да', STEP_ISFILE_ACTIONS.YES),
        telegraf_1.Markup.button.callback('Нет', STEP_ISFILE_ACTIONS.NO)
    ]));
}
exports.askForIsFile = askForIsFile;
const stepIsFileHandler = new telegraf_1.Composer();
stepIsFileHandler.action(STEP_ISFILE_ACTIONS.YES, async (ctx) => {
    await (0, file_1.askForFile)(ctx);
    return ctx.wizard.next();
});
stepIsFileHandler.action(STEP_ISFILE_ACTIONS.NO, async (ctx) => {
    ctx.scene.session.add.multiday = false;
    await (0, start_date_1.askForStartDate)(ctx);
    return ctx.wizard.selectStep(ctx.wizard.cursor + 2);
});
stepIsFileHandler.use((ctx) => ctx.replyWithMarkdown('⛔️ Неправильное значение.'));
exports.default = stepIsFileHandler;
//# sourceMappingURL=isfile.js.map