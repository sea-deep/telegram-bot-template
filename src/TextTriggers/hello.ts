import { Context, Telegraf } from "telegraf";
import { TextContext, TextTrigger } from "../Utils/textHandler";
import { removeKeyboard } from "telegraf/markup";


export default {
    name: "🏠 Hello",
    execute: async (ctx: TextContext, bot: Telegraf<Context>) => {
        await ctx.reply("This button does nothing :(", removeKeyboard()); 
        console.log(ctx.from?.first_name, "clicked the 🏠 Hello button");
    }

} as TextTrigger;