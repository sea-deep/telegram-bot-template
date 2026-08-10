import { Telegraf } from "telegraf";
import { env } from "./utilities/env.js";
import { Logger } from "./helpers/Logger.js";
import { loadCommands } from "./utilities/commandHandler.js";
import { loadEvents } from "./utilities/eventHandler.js";
import { loadInlineButtons } from "./utilities/inlineButtonHandler.js";
import { loadKeyboardButtons } from "./utilities/keyboardButtonHandler.js";
import { loadTextTriggers } from "./utilities/textHandler.js";
import { loadInlineQueries } from "./utilities/inlineQueryHandler.js";
import { loadChosenResults } from "./utilities/chosenResultHandler.js";
Logger.info("Initializing Telegram Bot...");
export const bot = new Telegraf(env.BOT_TOKEN);
// Global Error Catching Middleware
bot.catch((err, ctx) => {
    Logger.error(`Unhandled error on update ${ctx.updateType}:`, err);
});
async function main() {
    try {
        // Load all dynamic handlers strictly in this order to prevent middleware collisions:
        await loadCommands(bot); // 1. Slash Commands (bot.command)
        await loadInlineQueries(bot); // 2. Inline Queries (bot.inlineQuery)
        await loadChosenResults(bot); // 3. Chosen Inline Results (bot.on('chosen_inline_result'))
        await loadInlineButtons(bot); // 4. Callback Queries (bot.action)
        await loadKeyboardButtons(bot); // 5. Reply Keyboards (bot.hears)
        await loadTextTriggers(bot); // 6. Regular Text Triggers (bot.hears)
        await loadEvents(bot); // 7. Catch-all Events (bot.on)
        // Launch Telegraf Bot
        await bot.launch();
        Logger.success("🚀 Telegram Bot is online and polling for updates!");
    }
    catch (error) {
        Logger.error("Failed to start bot:", error);
        process.exit(1);
    }
}
main();
// Enable graceful shutdown
process.once("SIGINT", () => {
    Logger.info("SIGINT signal received. Stopping bot...");
    bot.stop("SIGINT");
});
process.once("SIGTERM", () => {
    Logger.info("SIGTERM signal received. Stopping bot...");
    bot.stop("SIGTERM");
});
