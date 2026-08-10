import { Telegraf, Context } from "telegraf";
import { Command } from "../structures/Command.js";
import { resolveFiles } from "./pathResolver.js";
import { checkCommandGuards } from "./CommandOptions.js";
import { Logger } from "../helpers/Logger.js";
import { env } from "./env.js";

export const commandsMap = new Map<string, Command>();

export async function loadCommands(bot: Telegraf<Context>): Promise<void> {
  commandsMap.clear();

  try {
    const fileUrls = await resolveFiles("commands");

    for (const fileUrl of fileUrls) {
      const module = await import(fileUrl);
      const command: Command = module.default;

      if (!command || !command.name) {
        continue;
      }

      if (command.disabled || command.options?.disabled) {
        Logger.debug(`Skipping disabled command: ${command.name}`);
        continue;
      }

      commandsMap.set(command.name, command);
      
      const aliases = command.aliases ? [command.name, ...command.aliases] : command.name;

      bot.command(aliases, async (ctx) => {
        try {
          // Parse args natively
          const text = ctx.message.text;
          const args = text.split(/ +/).slice(1);
          
          const allowed = await checkCommandGuards(ctx, command, args);
          if (!allowed) return;

          await command.execute(ctx, bot, args);
        } catch (error) {
          Logger.error(`Error executing command /${command.name}:`, error);
        }
      });
    }

    Logger.info(`[CommandHandler] - Loaded ${commandsMap.size} command(s) natively`);

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
  } catch (error) {
    Logger.error("[CommandHandler] - Error loading commands:", error);
  }
}
