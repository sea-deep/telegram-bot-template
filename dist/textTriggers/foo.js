import { Markup } from "telegraf";
const fooTrigger = {
    name: "🌞 Foo",
    execute: async (ctx) => {
        await ctx.reply("Foo trigger activated! You selected 🌞 Foo.", Markup.removeKeyboard());
    },
};
export default fooTrigger;
