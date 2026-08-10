import { resolveFiles } from "./pathResolver.js";
import { checkCommandGuards } from "./CommandOptions.js";
import { Logger } from "../helpers/Logger.js";
import { env } from "./env.js";
export const commandsMap = new Map();
export async function loadCommands(bot) {
    commandsMap.clear();
    try {
        const fileUrls = await resolveFiles("commands");
        for (const fileUrl of fileUrls) {
            const module = await import(fileUrl);
            const command = module.default;
            if (!command || !command.name) {
                continue;
            }
            if (command.disabled || command.options?.disabled) {
                Logger.debug(`Skipping disabled command: ${command.name}`);
                continue;
            }
            commandsMap.set(command.name, command);
        }
        // Register our custom command router middleware at the top level
        bot.on("message", async (ctx, next) => {
            // 1. Ensure it's a text message
            if (!ctx.message || !("text" in ctx.message)) {
                return next();
            }
            const text = ctx.message.text;
            const prefix = "/";
            // 2. Check for prefix
            if (!text.startsWith(prefix)) {
                return next();
            }
            // 3. Parse command name and arguments
            const args = text.slice(prefix.length).trim().split(/ +/);
            let commandName = args.shift()?.toLowerCase();
            if (!commandName) {
                return next();
            }
            // Strip @BotUsername if present
            if (commandName.includes("@")) {
                const parts = commandName.split("@");
                commandName = parts[0];
                const targetBot = parts[1];
                if (ctx.botInfo && targetBot !== ctx.botInfo.username.toLowerCase()) {
                    return next(); // Command meant for another bot
                }
            }
            // 4. Look up command
            const command = commandsMap.get(commandName);
            if (!command) {
                // Unknown command
                if (ctx.chat?.type === "private") {
                    await ctx.reply(env.UNKNOWN_COMMAND_MESSAGE);
                }
                return next(); // Always call next() in case other middleware/text handlers want to process this
            }
            // 5. Execute command (with guards)
            try {
                const allowed = await checkCommandGuards(ctx, command);
                if (!allowed)
                    return; // Guard failed, block execution. (Do NOT call next() here so we don't bleed into text triggers)
                await command.execute(ctx, bot, args);
            }
            catch (error) {
                Logger.error(`Error executing command /${command.name}:`, error);
            }
        });
        Logger.info(`[CommandHandler] - Loaded ${commandsMap.size} command(s) and activated custom router`);
        // Sync commands with Telegram Bot API UI menu
        const botCommands = Array.from(commandsMap.values()).map((cmd) => ({
            command: cmd.name.toLowerCase(),
            description: cmd.description || cmd.name,
        }));
        if (botCommands.length > 0) {
            bot.telegram.setMyCommands(botCommands).catch((err) => {
                Logger.warn("Failed to sync commands with Telegram API:", err.message);
            });
        }
    }
    catch (error) {
        Logger.error("[CommandHandler] - Error loading commands:", error);
    }
}
