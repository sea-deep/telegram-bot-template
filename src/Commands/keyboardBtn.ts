import { Context, Markup, Telegraf } from "telegraf";
import { Command } from "../Utils/commandHandler";

export default {
    name: "keyboard",
    description: "Keyboard buttons example",
    execute: async (ctx: Context, bot: Telegraf<Context>) => {
        await ctx.reply("Hello World!", 
            Markup.keyboard([
                ["🏠 Hello", "🌴 World"],
                ["🌞 Foo", "🏝️ Bar"]
            ])
            .oneTime() // Remove the keyboard after the user clicks a button
            .resize() // Resize the keyboard to fit the screen
        );
    }
} as Command;