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
const filters_1 = require("telegraf/filters");
exports.default = {
    type: (0, filters_1.message)("new_chat_members"),
    execute: (ctx, bot) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        const msg = ctx.message;
        if (msg.new_chat_members[0].id == ((_a = bot.botInfo) === null || _a === void 0 ? void 0 : _a.id)) {
            console.log("Bot Joined a group");
            return ctx.reply(`Hello everyone! I'm ${(_b = bot.botInfo) === null || _b === void 0 ? void 0 : _b.first_name}!\nCan I have mod pls UwU?`);
        }
        if (msg === null || msg === void 0 ? void 0 : msg.new_chat_members) {
            console.log("New Member Joined...?", msg.new_chat_members[0].first_name, "welcome to the group!");
        }
    })
};
