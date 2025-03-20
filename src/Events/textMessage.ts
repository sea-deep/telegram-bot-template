import { message } from 'telegraf/filters';
import { Event } from '../Utils/eventHandler';
import { Context, Telegraf } from 'telegraf';
import { Message } from 'telegraf/types';

export default {
    type: message('text'),
    execute: async (ctx: Context, bot: Telegraf<Context>) => {
         const msg = ctx.message as Message.TextMessage;
        console.log(msg.from?.first_name, "said", msg.text);
    }
} as Event;
