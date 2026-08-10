import { message } from "telegraf/filters";
import { Logger } from "../helpers/Logger.js";
const newChatMembersEvent = {
    type: message("new_chat_members"),
    execute: async (ctx, bot) => {
        if (!ctx.message || !("new_chat_members" in ctx.message))
            return;
        const newMembers = ctx.message.new_chat_members;
        const botId = bot.botInfo?.id;
        for (const member of newMembers) {
            if (member.id === botId) {
                Logger.info(`Bot added to chat: ${ctx.chat?.id}`);
                await ctx.reply(`Hello everyone! I'm ${bot.botInfo?.first_name || "Bot"}! Thanks for adding me.`);
            }
            else {
                Logger.info(`New member joined chat ${ctx.chat?.id}: ${member.first_name}`);
                await ctx.reply(`Welcome to the group, ${member.first_name}!`);
            }
        }
    },
};
export default newChatMembersEvent;
