import { Logger } from "../helpers/Logger.js";
const helloButton = {
    name: "🏠 Hello",
    execute: async (ctx) => {
        Logger.debug("User pressed Hello button");
        await ctx.reply("You pressed Hello!");
    },
};
export default helloButton;
