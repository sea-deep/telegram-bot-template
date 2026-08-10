import { Event } from "../structures/Event.js";
import { Logger } from "../helpers/Logger.js";

const event: Event = {
  type: "message",
  execute: async (ctx, bot) => {
    // Because our custom Command Router intercepts commands and only calls next() for non-commands,
    // this event will ONLY fire for regular messages (or unknown commands).
    
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
