import { Markup } from "telegraf";
import { TextTrigger } from "../structures/TextTrigger.js";

const fooTrigger: TextTrigger = {
  name: "🌞 Foo",
  execute: async (ctx) => {
    await ctx.reply("Foo trigger activated! You selected 🌞 Foo.", Markup.removeKeyboard());
  },
};

export default fooTrigger;
