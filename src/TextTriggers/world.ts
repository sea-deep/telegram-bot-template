import { Context, Telegraf } from "telegraf";
import { TextContext, TextTrigger } from "../Utils/textHandler";
import { removeKeyboard } from "telegraf/markup";


export default {
    name: "🌴 World",
    execute: async (ctx: TextContext, bot: Telegraf<Context>) => {
        await ctx.reply("This button does nothing :(", removeKeyboard()); 
        console.log(ctx.from?.first_name, "clicked the 🌴 World button");
    }

} as TextTrigger;