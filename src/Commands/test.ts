import { Context, Markup, Telegraf } from "telegraf";

export default {
    name: "btn",
    descrription: "Test button",
    execute: async (ctx: Context, bot: Telegraf<Context>) => {
        await ctx.reply("Hello World!", 
            Markup.keyboard([
                ["Hello", "World"],
                ["Test", "Button"]
            ])
         
         .resize()
        );
    }
}