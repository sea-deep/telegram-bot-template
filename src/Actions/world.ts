import { Context, Telegraf } from "telegraf";
import { Action, ActionContext } from "../Utils/actionHandler";
import { removeKeyboard } from "telegraf/markup";


export default {
    name: "world",
    execute: async (ctx: ActionContext, bot: Telegraf<Context>) => {
        await ctx.reply("This button does nothing :)", removeKeyboard());
        console.log(ctx.from?.first_name, "clicked the world button");
    }

} as Action;