import { Markup } from "telegraf";
import { TextTrigger } from "../structures/TextTrigger.js";

const worldTrigger: TextTrigger = {
  name: "🌴 World",
  execute: async (ctx) => {
    await ctx.reply("Hello World! You selected 🌴 World.", Markup.removeKeyboard());
  },
};

export default worldTrigger;
