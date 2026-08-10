import { Logger } from "../helpers/Logger.js";
const fooButton = {
    name: "🌞 Foo",
    execute: async (ctx) => {
        Logger.debug("User pressed Foo button");
        await ctx.reply("You pressed Foo!");
    },
};
export default fooButton;
