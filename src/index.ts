import * as dotenv from 'dotenv';
dotenv.config();

import { Telegraf } from "telegraf";

export const bot = new Telegraf(process.env.BOT_TOKEN);

import("./Utils/commandHandler.js");
import("./Utils/eventHandler.js");
import("./Utils/actionHandler.js");
import("./Utils/textHandler.js");


console.log("[INFO] - Bot is online");
bot.launch();

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));