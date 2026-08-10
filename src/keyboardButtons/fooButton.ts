import { Markup } from "telegraf";
import { KeyboardButton } from "../structures/KeyboardButton.js";
import { Logger } from "../helpers/Logger.js";

const fooButton: KeyboardButton = {
  name: "🌞 Foo",
  execute: async (ctx) => {
    Logger.debug("User pressed Foo button");
    await ctx.reply("You pressed Foo!");
  },
};

export default fooButton;
