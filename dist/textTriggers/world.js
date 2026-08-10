import { Markup } from "telegraf";
const worldTrigger = {
    name: "🌴 World",
    execute: async (ctx) => {
        await ctx.reply("Hello World! You selected 🌴 World.", Markup.removeKeyboard());
    },
};
export default worldTrigger;
