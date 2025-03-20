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
const telegraf_1 = require("telegraf");
exports.default = {
    name: "inline",
    description: "Inline Buttons example",
    execute: (ctx, bot) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        yield ctx.reply(`Hello ${(_a = ctx.from) === null || _a === void 0 ? void 0 : _a.first_name}!\nThis command has inline buttons!`, telegraf_1.Markup.inlineKeyboard([
            [telegraf_1.Markup.button.callback("Button 1", "btn_1"), telegraf_1.Markup.button.callback("Button 2", "btn_2")],
            [telegraf_1.Markup.button.callback("Button 3", "btn_3"), telegraf_1.Markup.button.callback("Button 4", "btn_4")],
        ]));
    })
};
