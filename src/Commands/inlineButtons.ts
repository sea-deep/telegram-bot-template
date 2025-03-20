import { Context, Markup, Telegraf } from "telegraf";
import { Command } from "../Utils/commandHandler";


export default {
    name: "btn2",
    description: "Inline Buttons",
    execute: async (ctx: Context, bot: Telegraf<Context>) => {
        await ctx.reply(`Hello ${ctx.from?.first_name}!\nThis command has inline buttons!`, Markup.inlineKeyboard([
            [Markup.button.callback("Button 1", "btn_1"), Markup.button.callback("Button 2", "btn_2")],
            [Markup.button.callback("Button 3", "btn_3"), Markup.button.callback("Button 4", "btn_4")],
            [Markup.button.callback("Button 5", "notabutton"), Markup.button.callback("Button 6", "faceincel")],
        ]));

    }
} as Command;