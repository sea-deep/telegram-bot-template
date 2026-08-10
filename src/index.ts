import { Telegraf } from "telegraf";
import { env } from "./utilities/env.js";
import { Logger } from "./helpers/Logger.js";
import { loadCommands } from "./utilities/commandHandler.js";
import { loadEvents } from "./utilities/eventHandler.js";
import { loadInlineButtons } from "./utilities/inlineButtonHandler.js";
import { loadKeyboardButtons } from "./utilities/keyboardButtonHandler.js";
import { loadTextTriggers } from "./utilities/textHandler.js";

Logger.info("Initializing Telegram Bot...");

export const bot = new Telegraf(env.BOT_TOKEN);

// Global Error Catching Middleware
bot.catch((err, ctx) => {
  Logger.error(`Unhandled error on update ${ctx.updateType}:`, err);
});

async function main() {
  try {
    // Load all dynamic handlers strictly in this order to prevent middleware collisions:
    await loadCommands(bot);        // 1. Slash Commands (bot.on('message') router)
    await loadInlineButtons(bot);   // 2. Callback Queries (bot.action)
    await loadKeyboardButtons(bot); // 3. Reply Keyboards (bot.hears)
    await loadTextTriggers(bot);    // 4. Regular Text Triggers (bot.hears)
    await loadEvents(bot);          // 5. Catch-all Events (bot.on)

    // Launch Telegraf Bot
    await bot.launch();
    Logger.success("🚀 Telegram Bot is online and polling for updates!");
  } catch (error) {
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