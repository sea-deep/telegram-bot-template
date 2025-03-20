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
    name: /btn_(.+)/, // Buttons with the format btn_* will trigger this action
    // ctx.match[1] will contain the value of the wildcard
    execute: (ctx, bot) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        yield ctx.reply(`You clicked ` + ((_a = ctx.match) === null || _a === void 0 ? void 0 : _a[1]));
        ctx.answerCbQuery(); // Stops the loading animation
    })
};
