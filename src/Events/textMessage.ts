 import { message } from 'telegraf/filters';
import { Event } from '../Utils/eventHandler';
import { Context, Telegraf } from 'telegraf';

export default {
    type: message("text"),
    execute: async (ctx: Context, bot: Telegraf<Context>) => {
       console.log(ctx.text);
    }
} as Event;
