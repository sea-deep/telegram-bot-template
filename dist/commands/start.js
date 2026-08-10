import { fmt, bold, italic } from "telegraf/format";
const startCommand = {
    name: "start",
    description: "Start the bot and get welcome information",
    category: "General",
    options: {
        privateOnly: true,
    },
    execute: async (ctx, bot, args) => {
        const firstName = ctx.from?.first_name || "User";
        const botName = bot.botInfo?.first_name || "Bot";
        await ctx.reply(fmt `Hello ${bold(firstName)}! I'm ${bold(botName)}.\n\n${italic("Use /help to see all available commands.")}`);
    },
};
export default startCommand;
