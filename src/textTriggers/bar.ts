import { Markup } from "telegraf";
import { TextTrigger } from "../structures/TextTrigger.js";

const barTrigger: TextTrigger = {
  name: "🏝️ Bar",
  execute: async (ctx) => {
    await ctx.reply("Bar trigger activated! You selected 🏝️ Bar.", Markup.removeKeyboard());
  },
};

export default barTrigger;
