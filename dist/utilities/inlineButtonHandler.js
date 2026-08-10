import { resolveFiles } from "./pathResolver.js";
import { Logger } from "../helpers/Logger.js";
export const inlineButtonsMap = new Map();
export async function loadInlineButtons(bot) {
    inlineButtonsMap.clear();
    try {
        const fileUrls = await resolveFiles("inlineButtons");
        for (const fileUrl of fileUrls) {
            const module = await import(fileUrl);
            const button = module.default;
            if (!button || !button.name) {
                continue;
            }
            if (button.disabled) {
                Logger.debug(`Skipping disabled inline button: ${button.name}`);
                continue;
            }
            inlineButtonsMap.set(button.name, button);
            bot.action(button.name, async (ctx) => {
                try {
                    await button.execute(ctx, bot);
                }
                catch (error) {
                    Logger.error(`Error executing inline button ${button.name}:`, error);
                }
            });
        }
        Logger.info(`[InlineButtonHandler] - Loaded ${inlineButtonsMap.size} inline button(s)`);
    }
    catch (error) {
        Logger.error("[InlineButtonHandler] - Error loading inline buttons:", error);
    }
}
