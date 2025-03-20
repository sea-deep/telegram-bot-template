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
exports.default = {
    name: "start",
    description: "Start the bot",
    execute: (ctx, bot) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b, _c;
        if (((_a = ctx.message) === null || _a === void 0 ? void 0 : _a.chat.type) !== "private")
            return ctx.replyWithMarkdownV2("_Shall we talk in private?_ UwU <3");
        yield ctx.reply(`Hello ${(_b = ctx.from) === null || _b === void 0 ? void 0 : _b.first_name}. I'm ${(_c = bot.botInfo) === null || _c === void 0 ? void 0 : _c.first_name}!\nUse /help to see the available commands.`);
    })
};
