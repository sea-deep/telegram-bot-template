import { Context, Telegraf } from "telegraf";
import { Command } from "../Utils/commandHandler";


export default {
    name: "start",
    description: "Start the bot",
    execute: async (ctx: Context, bot: Telegraf<Context>) => {
        if (ctx.message?.chat.type !== "private") return ctx.replyWithMarkdownV2("_Shall we talk in private?_ UwU <3"); 
        await ctx.reply(`Hello ${ctx.from?.first_name}. I'm ${bot.botInfo?.first_name}!\nUse /help to see the available commands.`);

    }
} as Command;