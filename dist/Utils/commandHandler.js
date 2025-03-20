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
const index_1 = require("../index");
const node_url_1 = require("node:url");
function loadCommands() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const Files = yield (0, glob_1.glob)(`${process.cwd()}/dist/Commands/**/*.js`);
            for (let file of Files) {
                file = (0, node_url_1.pathToFileURL)(file).toString();
                const commandFile = (yield import(file)).default;
                const command = commandFile.default;
                if (!command || command.disabled || !command.name) {
                    continue;
                }
                const commandName = command.name;
                try {
                    index_1.bot.command(commandName, (ctx) => {
                        try {
                            command.execute(ctx, index_1.bot);
                        }
                        catch (error) {
                            console.error(`[CommandHandler] -`, error);
                        }
                    });
                }
                catch (error) {
                    console.error(`[CommandHandler] -`, error);
                }
            }
            console.info(`[INFO] - Commands Loaded`);
        }
        catch (error) {
            console.error(`[CommandHandler] -`, error);
        }
    });
}
loadCommands();
