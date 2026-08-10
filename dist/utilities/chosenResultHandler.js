import { resolveFiles } from "./pathResolver.js";
import { Logger } from "../helpers/Logger.js";
export const chosenResultsMap = new Map();
export async function loadChosenResults(bot) {
    chosenResultsMap.clear();
    try {
        const fileUrls = await resolveFiles("chosenResults");
        for (const fileUrl of fileUrls) {
            const module = await import(fileUrl);
            const result = module.default;
            if (!result || !result.name) {
                continue;
            }
            if (result.disabled) {
                Logger.debug(`Skipping disabled chosen result: ${result.name}`);
                continue;
            }
            chosenResultsMap.set(result.name, result);
            // Telegraf doesn't have a native chosenInlineResult(trigger) method like hears or action.
            // So we intercept all of them and test the regex/string manually.
            bot.on("chosen_inline_result", async (ctx, next) => {
                const id = ctx.chosenInlineResult.result_id;
                // Match string or array of strings
                if (typeof result.name === "string" && id === result.name) {
                    return await executeResult(ctx, bot, result);
                }
                if (Array.isArray(result.name)) {
                    for (const matcher of result.name) {
                        if (typeof matcher === "string" && id === matcher) {
                            return await executeResult(ctx, bot, result);
                        }
                        if (matcher instanceof RegExp && matcher.test(id)) {
                            return await executeResult(ctx, bot, result);
                        }
                    }
                }
                // Match RegExp
                if (result.name instanceof RegExp && result.name.test(id)) {
                    return await executeResult(ctx, bot, result);
                }
                return next();
            });
        }
        Logger.info(`[ChosenResultHandler] - Loaded ${chosenResultsMap.size} chosen result(s)`);
    }
    catch (error) {
        Logger.error("[ChosenResultHandler] - Error loading chosen results:", error);
    }
}
async function executeResult(ctx, bot, result) {
    try {
        await result.execute(ctx, bot);
    }
    catch (error) {
        Logger.error(`Error executing chosen result ${result.name}:`, error);
    }
}
