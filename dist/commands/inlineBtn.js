import { Markup } from "telegraf";
const inlineBtnCommand = {
    name: "inline",
    description: "Inline keyboard buttons example",
    category: "Interactive",
    execute: async (ctx, bot, args) => {
        const firstName = ctx.from?.first_name || "User";
        await ctx.reply(`Hello ${firstName}!\nThis command demonstrates inline keyboard buttons:`, Markup.inlineKeyboard([
            [
                Markup.button.callback("Button 1", "btn_1"),
                Markup.button.callback("Button 2", "btn_2"),
            ],
            [
                Markup.button.callback("Button 3", "btn_3"),
                Markup.button.callback("Button 4", "btn_4"),
            ],
        ]));
    },
};
export default inlineBtnCommand;
