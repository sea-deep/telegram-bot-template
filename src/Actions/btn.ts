import { Context, Telegraf } from "telegraf";
import { Action, ActionContext } from "../Utils/actionHandler";


export default {
    name: /btn_(.+)/, // Buttons with the format btn_* will trigger this action
                      // ctx.match[1] will contain the value of the wildcard
    execute: async (ctx: ActionContext, bot: Telegraf<Context>) => {
        await ctx.reply(`You clicked ` + (ctx.match?.[1]));

        ctx.answerCbQuery(); // Stops the loading animation
    }

} as Action;