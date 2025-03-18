import { Context, Markup, Telegraf } from "telegraf";

export default {
    name: "btn",
    description: "Test button",
    execute: async (ctx: Context, bot: Telegraf<Context>) => {
        await ctx.reply("Hello World!", 
            Markup.keyboard([
                ["Hello", "World"],
                ["Test", "Button", "Uhhh"],
                ["One", "Two"]
            ])
            .oneTime() // Remove the keyboard after the user clicks a button
            .resize() // Resize the keyboard to fit the screen
        );
    }
}