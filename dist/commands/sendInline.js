import { Markup } from "telegraf";
const sendInlineCommand = {
    name: "sendinline",
    description: "Inline keyboard buttons example",
    category: "Interactive",
    execute: async (ctx, bot, args) => {
        const firstName = ctx.from?.first_name || "User";
        await ctx.reply(`Hello ${firstName}!\nThis command demonstrates inline keyboard buttons:`, Markup.inlineKeyboard([
            [
                Markup.button.callback("Click Me!", "btn_1"),
                Markup.button.callback("Don't Click Me!", "btn_2"),
            ],
            [
                Markup.button.callback("Button 3", "btn_3"),
                Markup.button.callback("Button 4", "btn_4"),
            ],
        ]));
    },
};
export default sendInlineCommand;
