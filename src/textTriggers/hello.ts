import { Markup } from "telegraf";
import { TextTrigger } from "../structures/TextTrigger.js";

const helloTrigger: TextTrigger = {
  name: "🏠 Hello",
  execute: async (ctx) => {
    await ctx.reply("Hello there! You selected 🏠 Hello.", Markup.removeKeyboard());
  },
};

export default helloTrigger;
