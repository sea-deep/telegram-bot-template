import { Logger } from "../helpers/Logger.js";
const btnAction = {
    name: /btn_(.+)/,
    execute: async (ctx) => {
        const buttonId = ctx.match?.[1] || "unknown";
        Logger.debug(`User clicked callback button: ${buttonId}`);
        await ctx.reply(`You clicked button ${buttonId}`);
        await ctx.answerCbQuery();
    },
};
export default btnAction;
