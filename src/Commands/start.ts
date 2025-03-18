import { Context, Telegraf } from "telegraf";
import { Command } from "../Utils/commandHandler";


export default {
    name: "start",
    description: "Start the bot",
    execute: async (ctx: Context, bot: Telegraf<Context>) => {
        await ctx.reply(`Hello ${ctx.from?.first_name}. I'm Hatsune Miku!\nUse /help to see the available commands.`);

    }
} as Command;