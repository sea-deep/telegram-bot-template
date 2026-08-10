import { Markup } from "telegraf";
const helloTrigger = {
    name: "🏠 Hello",
    execute: async (ctx) => {
        await ctx.reply("Hello there! You selected 🏠 Hello.", Markup.removeKeyboard());
    },
};
export default helloTrigger;
