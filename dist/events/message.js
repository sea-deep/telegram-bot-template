import { Logger } from "../helpers/Logger.js";
const event = {
    type: "message",
    execute: async (ctx, bot) => {
        // Because our custom Command Router intercepts commands and only calls next() for non-commands,
        // this event will ONLY fire for regular messages (or unknown commands).
        // Check if the message contains text
        if (!ctx.message || !("text" in ctx.message)) {
            // You could handle photos, stickers, etc. here for the anonymous chat later!
            return;
        }
        const text = ctx.message.text;
        // TODO: Implement anonymous chat routing logic here
        /* Example flow:
           1. Check if ctx.from.id is in active chat sessions map
           2. If yes, get partner ID
           3. Send message to partner ID (e.g., bot.telegram.sendMessage(partnerId, text))
           4. If no, ignore or reply "You are not in a chat. Use /search"
        */
        // For now, let's just log it
        Logger.debug(`[Message Event] Received text: ${text}`);
    },
};
export default event;
