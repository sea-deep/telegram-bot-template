import { Markup } from "telegraf";
const barTrigger = {
    name: "🏝️ Bar",
    execute: async (ctx) => {
        await ctx.reply("Bar trigger activated! You selected 🏝️ Bar.", Markup.removeKeyboard());
    },
};
export default barTrigger;
