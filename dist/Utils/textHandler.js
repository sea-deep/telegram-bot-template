"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const glob_1 = require("glob");
const node_url_1 = require("node:url");
const index_1 = require("../index");
function loadTexts() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const Files = yield (0, glob_1.glob)(`${process.cwd()}/dist/TextTriggers/**/*.js`);
            for (let file of Files) {
                file = (0, node_url_1.pathToFileURL)(file).toString();
                const textFile = (yield import(file)).default;
                const text = textFile.default;
                if (text.disabled)
                    continue;
                const textName = text.name;
                if (!textName)
                    continue;
                try {
                    index_1.bot.hears(textName, (ctx) => __awaiter(this, void 0, void 0, function* () {
                        try {
                            yield text.execute(ctx, index_1.bot);
                        }
                        catch (err) {
                            console.error(`[TextHandler] - Error in "${textName}":\n`, err);
                        }
                    }));
                }
                catch (error) {
                    console.error(`[TextHandler] -`, error);
                }
            }
            console.info(`[INFO] - Text Triggers Loaded`);
        }
        catch (err) {
            console.error(`[TextHandler] -`, err);
        }
    });
}
loadTexts();
