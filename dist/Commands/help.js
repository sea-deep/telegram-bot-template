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
const markup_1 = require("telegraf/markup");
let commands = [];
function loadCommands() {
    return __awaiter(this, void 0, void 0, function* () {
        const commandFiles = yield (0, glob_1.glob)(`${process.cwd()}/dist/Commands/**/*.js`);
        for (let file of commandFiles) {
            file = (0, node_url_1.pathToFileURL)(file).toString();
            const commandFile = (yield import(file)).default;
            const command = commandFile.default;
            if (!command || command.disabled || !command.name) {
                continue;
            }
            commands.push({ name: command.name, description: command.description });
        }
    });
}
loadCommands();
exports.default = {
    name: "help",
    description: "Show the available commands",
    execute: (ctx, bot) => __awaiter(void 0, void 0, void 0, function* () {
        yield ctx.replyWithMarkdownV2("__*Here are the available commands:*__\n\n" + commands.map((command) => `/${command.name} \\- ${command.description}`).join("\n"), (0, markup_1.removeKeyboard)());
    })
};
