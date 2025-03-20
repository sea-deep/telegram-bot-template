import { Context, Markup, Telegraf } from "telegraf";
import { Command } from "../Utils/commandHandler";

export default {
    name: "btn",
    description: "Test button",
    execute: async (ctx: Context, bot: Telegraf<Context>) => {
        await ctx.reply("Hello World!", 
            Markup.keyboard([
               [Markup.button.text("Hello")],
                ["Test", "Button", "Uhhh"],
                ["One", "Two"]
            ])
            .oneTime() // Remove the keyboard after the user clicks a button
            .resize() // Resize the keyboard to fit the screen
        );
    }
} as Command;