import { message } from 'telegraf/filters';
import { Event } from '../Utils/eventHandler';
import { Message } from 'telegraf/types';

export default {
    type: message("new_chat_members"), 
    execute: async (ctx, bot) => {
        const msg = ctx.message as Message.NewChatMembersMessage;
        if (msg.new_chat_members[0].id == bot.botInfo?.id) {
            console.log("Bot Joined a group")
            return ctx.reply(`Hello everyone! I'm ${bot.botInfo?.first_name}!\nCan I have mod pls UwU?`);
        }
        if (msg?.new_chat_members) {
            console.log("New Member Joined...?", msg.new_chat_members[0].first_name, "welcome to the group!");
        }
    }
} as Event;
