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
    name: "keyboard",
    description: "Keyboard buttons example",
    execute: (ctx, bot) => __awaiter(void 0, void 0, void 0, function* () {
        yield ctx.reply("Hello World!", telegraf_1.Markup.keyboard([
            ["🏠 Hello", "🌴 World"],
            ["🌞 Foo", "🏝️ Bar"]
        ])
            .oneTime() // Remove the keyboard after the user clicks a button
            .resize() // Resize the keyboard to fit the screen
        );
    })
};
