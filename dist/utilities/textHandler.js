import { resolveFiles } from "./pathResolver.js";
import { Logger } from "../helpers/Logger.js";
export async function loadTextTriggers(bot) {
    try {
        const fileUrls = await resolveFiles("textTriggers");
        let count = 0;
        for (const fileUrl of fileUrls) {
            const module = await import(fileUrl);
            const trigger = module.default;
            if (!trigger || !trigger.name || trigger.disabled) {
                continue;
            }
            bot.hears(trigger.name, async (ctx) => {
                try {
                    await trigger.execute(ctx, bot);
                }
                catch (error) {
                    Logger.error(`Error in text trigger handler "${String(trigger.name)}":`, error);
                }
            });
            count++;
        }
        Logger.info(`[TextHandler] - Loaded ${count} text trigger(s)`);
    }
    catch (error) {
        Logger.error("[TextHandler] - Error loading text triggers:", error);
    }
}
