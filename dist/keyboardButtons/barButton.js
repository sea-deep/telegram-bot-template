import { Logger } from "../helpers/Logger.js";
const barButton = {
    name: "🏝️ Bar",
    execute: async (ctx) => {
        Logger.debug("User pressed Bar button");
        await ctx.reply("You pressed Bar!");
    },
};
export default barButton;
