import { Telegraf, session } from "telegraf";
import { BotContext } from "./structures/BotContext.js";
import { env } from "./utilities/env.js";
import { Logger } from "./helpers/Logger.js";
import { loadCommands } from "./utilities/commandHandler.js";
import { loadEvents } from "./utilities/eventHandler.js";
import { loadInlineButtons } from "./utilities/inlineButtonHandler.js";
import { loadKeyboardButtons } from "./utilities/keyboardButtonHandler.js";
import { loadScenes, stage } from "./utilities/sceneHandler.js";

Logger.info("Initializing Telegram Bot...");

export const bot = new Telegraf<BotContext>(env.BOT_TOKEN);

// Apply Session and Stage Middleware BEFORE loading route handlers
bot.use(session());
bot.use(stage.middleware());

// Global Error Catching Middleware
bot.catch((err, ctx) => {
  Logger.error(`Unhandled error on update ${ctx.updateType}:`, err);
});

async function main() {
  try {
    // Load all dynamic handlers strictly in this order to prevent middleware collisions:
    await loadScenes();             // 1. Scenes (Registers to Stage)
    await loadCommands(bot);        // 2. Slash Commands (bot.command)
    await loadInlineButtons(bot);   // 3. Callback Queries (bot.action)
    await loadKeyboardButtons(bot); // 4. Reply Keyboards (bot.hears)
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