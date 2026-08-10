import { Telegraf, Context } from "telegraf";
import { Event } from "../structures/Event.js";
import { resolveFiles } from "./pathResolver.js";
import { Logger } from "../helpers/Logger.js";

export async function loadEvents(bot: Telegraf<Context>): Promise<void> {
  try {
    const fileUrls = await resolveFiles("events");
    let count = 0;

    for (const fileUrl of fileUrls) {
      const module = await import(fileUrl);
      const event: Event = module.default;

      if (!event || !event.type || event.disabled) {
        continue;
      }

      bot.on(event.type as Parameters<typeof bot.on>[0], async (ctx) => {
        try {
          await event.execute(ctx, bot);
        } catch (error) {
          Logger.error(`Error in event handler for type "${String(event.type)}":`, error);
        }
      });

      count++;
    }

    Logger.info(`[EventHandler] - Loaded ${count} event(s)`);
  } catch (error) {
    Logger.error("[EventHandler] - Error loading events:", error);
  }
}
