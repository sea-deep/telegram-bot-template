import { Telegraf } from "telegraf";
import { env } from "./utilities/env.js";
import { Logger } from "./helpers/Logger.js";
import { loadCommands } from "./utilities/commandHandler.js";
import { loadEvents } from "./utilities/eventHandler.js";
import { loadActions } from "./utilities/actionHandler.js";
import { loadTextTriggers } from "./utilities/textHandler.js";
Logger.info("Initializing Telegram Bot...");
export const bot = new Telegraf(env.BOT_TOKEN);
// Monkey-patch bot.command to prevent its use and enforce our custom robust router
bot.command = () => {
    throw new Error("⚠️ Telegraf's native `bot.command` is disabled in this repository to prevent middleware order collisions. Please create a command file in `src/commands/` instead!");
};
// Global Error Catching Middleware
bot.catch((err, ctx) => {
    Logger.error(`Unhandled error on update ${ctx.updateType}:`, err);
});
async function main() {
    try {
        // Load all dynamic handlers
        await loadCommands(bot);
        await loadEvents(bot);
        await loadActions(bot);
        await loadTextTriggers(bot);
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
