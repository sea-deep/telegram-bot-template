import { Markup } from "telegraf";
const keyboardBtnCommand = {
    name: "keyboard",
    description: "Reply keyboard buttons example",
    category: "Interactive",
    execute: async (ctx, bot, args) => {
        await ctx.reply("Select an option from the keyboard below:", Markup.keyboard([
            ["🏠 Hello", "🌴 World"],
            ["🌞 Foo", "🏝️ Bar"],
        ])
            .oneTime()
            .resize());
    },
};
export default keyboardBtnCommand;
