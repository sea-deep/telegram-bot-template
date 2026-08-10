import { Markup } from "telegraf";
import { Command } from "../structures/Command.js";

const sendKeyboardCommand: Command = {
  name: "sendkeyboard",
  description: "Reply keyboard buttons example",
  category: "Interactive",
  execute: async (ctx, bot, args) => {
    await ctx.reply(
      "Select an option from the keyboard below:",
      Markup.keyboard([
        ["🏠 Hello", "🌴 World"],
        ["🌞 Foo", "🏝️ Bar"],
      ])
        .oneTime()
        .resize()
    );
  },
};

export default sendKeyboardCommand;
