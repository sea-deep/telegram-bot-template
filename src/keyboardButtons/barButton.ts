import { Markup } from "telegraf";
import { KeyboardButton } from "../structures/KeyboardButton.js";
import { Logger } from "../helpers/Logger.js";

const barButton: KeyboardButton = {
  name: "🏝️ Bar",
  execute: async (ctx) => {
    Logger.debug("User pressed Bar button");
    await ctx.reply("You pressed Bar!");
  },
};

export default barButton;
