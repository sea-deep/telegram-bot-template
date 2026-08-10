import { Markup } from "telegraf";
import { KeyboardButton } from "../structures/KeyboardButton.js";
import { Logger } from "../helpers/Logger.js";

const worldButton: KeyboardButton = {
  name: "🌴 World",
  execute: async (ctx) => {
    Logger.debug("User pressed World button");
    await ctx.reply("You pressed World!");
  },
};

export default worldButton;
