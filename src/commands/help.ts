import { fmt, bold, italic, code } from "telegraf/format";
import { Markup } from "telegraf";
import { Command } from "../structures/Command.js";
import { commandsMap } from "../utilities/commandHandler.js";

const helpCommand: Command = {
  name: "help",
  description: "Display all available bot commands categorized",
  category: "General",
  execute: async (ctx, bot, args) => {
    const categories = new Map<string, Command[]>();

    for (const command of commandsMap.values()) {
      const category = command.category || "General";
      if (!categories.has(category)) {
        categories.set(category, []);
      }
      categories.get(category)!.push(command);
    }

    let messageContent = fmt`${bold("📌 Available Commands:")}\n\n`;

    for (const [categoryName, cmds] of categories.entries()) {
      messageContent = fmt`${messageContent}${bold(`📁 ${categoryName}`)}\n`;
      for (const cmd of cmds) {
        messageContent = fmt`${messageContent}  • ${code(`/${cmd.name}`)} - ${italic(cmd.description)}\n`;
      }
      messageContent = fmt`${messageContent}\n`;
    }

    await ctx.reply(messageContent, Markup.removeKeyboard());
  },
};

export default helpCommand;
