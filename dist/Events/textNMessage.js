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
    type: "text",
    execute: (ctx) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        // Extract user information
        const username = ((_a = ctx.from) === null || _a === void 0 ? void 0 : _a.username) || "unknown";
        const firstName = ((_b = ctx.from) === null || _b === void 0 ? void 0 : _b.first_name) || "unknown";
        const messageText = (ctx === null || ctx === void 0 ? void 0 : ctx.text) || "";
        // Log the information
        console.log(`Message from ${firstName} (@${username}): "${messageText}"`);
    })
};
