import { Markup } from "telegraf";
import { KeyboardButton } from "../structures/KeyboardButton.js";
import { Logger } from "../helpers/Logger.js";

const helloButton: KeyboardButton = {
  name: "🏠 Hello",
  execute: async (ctx) => {
    Logger.debug("User pressed Hello button");
    await ctx.reply("You pressed Hello!");
  },
};

export default helloButton;
