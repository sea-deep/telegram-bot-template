import { Context } from "telegraf";
import { Command } from "../structures/Command.js";
import { env } from "./env.js";
import { Logger } from "../helpers/Logger.js";

export interface CommandOptions {
  ownerOnly?: boolean;
  adminOnly?: boolean;
  privateOnly?: boolean;
  groupOnly?: boolean;
  cooldown?: number; // Cooldown duration in seconds
  disabled?: boolean;
}

const cooldowns = new Map<string, number>();

/**
 * Checks all configured command execution guards (owner, admin, chat type, cooldown, disabled).
 * Returns true if execution is permitted, false otherwise.
 */
export async function checkCommandGuards(
  ctx: Context,
  command: Command
): Promise<boolean> {
  const options = command.options || {};
  const userId = ctx.from?.id;

  // 1. Check disabled
  if (command.disabled || options.disabled) {
    return false;
  }

  // 2. Check ownerOnly
  if (options.ownerOnly) {
    if (!userId || !env.OWNER_IDS.includes(String(userId))) {
      await ctx.reply("⚠️ This command is restricted to bot owners.");
      return false;
    }
  }

  // 3. Check privateOnly
  if (options.privateOnly) {
    if (ctx.chat?.type !== "private") {
      await ctx.reply("⚠️ This command can only be used in private messages.");
      return false;
    }
  }

  // 4. Check groupOnly
  if (options.groupOnly) {
    if (ctx.chat?.type !== "group" && ctx.chat?.type !== "supergroup") {
      await ctx.reply("⚠️ This command can only be used in group chats.");
      return false;
    }
  }

  // 5. Check adminOnly
  if (options.adminOnly) {
    if (ctx.chat?.type !== "group" && ctx.chat?.type !== "supergroup") {
      await ctx.reply("⚠️ This command can only be used in group chats.");
      return false;
    }

    if (userId) {
      try {
        const admins = await ctx.getChatAdministrators();
        const isAdmin = admins.some((admin) => admin.user.id === userId);
        if (!isAdmin) {
          await ctx.reply("⚠️ This command is restricted to group administrators.");
          return false;
        }
      } catch (err) {
        Logger.error(`Error checking group admin permissions for user ${userId}:`, err);
        await ctx.reply("⚠️ Unable to verify administrator permissions.");
        return false;
      }
    }
  }

  // 6. Check cooldown
  if (options.cooldown && userId) {
    const cooldownKey = `${command.name}:${userId}`;
    const now = Date.now();
    const cooldownAmount = options.cooldown * 1000;
    const expirationTime = cooldowns.get(cooldownKey) || 0;

    if (now < expirationTime) {
      const timeLeft = ((expirationTime - now) / 1000).toFixed(1);
      await ctx.reply(`⏳ Please wait ${timeLeft} second(s) before reusing \`/${command.name}\`.`);
      return false;
    }

    cooldowns.set(cooldownKey, now + cooldownAmount);
    setTimeout(() => cooldowns.delete(cooldownKey), cooldownAmount);
  }

  return true;
}
