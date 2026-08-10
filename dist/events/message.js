import { Logger } from "../helpers/Logger.js";
const event = {
    type: "message",
    execute: async (ctx, bot) => {
        // This event will only fire for regular messages because the native bot.command()
        // automatically handles commands and stops propagation.
        // Check if the message contains text
        if (!ctx.message || !("text" in ctx.message)) {
            return;
        }
        const text = ctx.message.text;
        // For now, let's just log it
        Logger.debug(`[Message Event] Received text: ${text}`);
    },
};
export default event;
