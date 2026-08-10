import { resolveFiles } from "./pathResolver.js";
import { Logger } from "../helpers/Logger.js";
export const keyboardButtonsMap = new Map();
export async function loadKeyboardButtons(bot) {
    keyboardButtonsMap.clear();
    try {
        const fileUrls = await resolveFiles("keyboardButtons");
        for (const fileUrl of fileUrls) {
            const module = await import(fileUrl);
            const button = module.default;
            if (!button || !button.name) {
                continue;
            }
            if (button.disabled) {
                Logger.debug(`Skipping disabled keyboard button: ${button.name}`);
                continue;
            }
            keyboardButtonsMap.set(button.name, button);
            bot.hears(button.name, async (ctx) => {
                try {
                    await button.execute(ctx, bot);
                }
                catch (error) {
                    Logger.error(`Error executing keyboard button ${button.name}:`, error);
                }
            });
        }
        Logger.info(`[KeyboardButtonHandler] - Loaded ${keyboardButtonsMap.size} keyboard button(s)`);
    }
    catch (error) {
        Logger.error("[KeyboardButtonHandler] - Error loading keyboard buttons:", error);
    }
}
