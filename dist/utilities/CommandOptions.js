import { Logger } from "../helpers/Logger.js";
import config from "../configs/config.js";
const cooldowns = new Map();
/**
 * Checks all configured command execution guards (owner, admin, chat type, cooldown, disabled).
 * Returns true if execution is permitted, false otherwise.
 */
export async function checkCommandGuards(ctx, command, args) {
    const options = command.options || {};
    const userId = ctx.from?.id;
    // 1. Check disabled
    if (command.disabled) {
        return false;
    }
    // 2. Check ownerOnly (uses config instead of env)
    if (command.ownerOnly || options.ownerOnly) {
        if (!userId || config.users.ownerId !== String(userId)) {
            await ctx.reply(config.messages.NOT_BOT_OWNER);
            return false;
        }
    }
    // 2.5 Check developerOnly
    if (command.developerOnly || options.developerOnly) {
        if (!userId || (!config.users.developers.includes(String(userId)) && config.users.ownerId !== String(userId))) {
            await ctx.reply(config.messages.NOT_BOT_DEVELOPER);
            return false;
        }
    }
    // 3. Check privateOnly
    if (options.privateOnly) {
        if (ctx.chat?.type !== "private") {
            await ctx.reply(config.messages.PRIVATE_ONLY);
            return false;
        }
    }
    // 4. Check groupOnly
    if (options.groupOnly) {
        if (ctx.chat?.type !== "group" && ctx.chat?.type !== "supergroup") {
            await ctx.reply(config.messages.GROUP_ONLY);
            return false;
        }
    }
    // 5. Check adminOnly
    if (options.adminOnly) {
        if (ctx.chat?.type !== "group" && ctx.chat?.type !== "supergroup") {
            await ctx.reply(config.messages.GROUP_ONLY);
            return false;
        }
        if (userId) {
            try {
                const admins = await ctx.getChatAdministrators();
                const isAdmin = admins.some((admin) => admin.user.id === userId);
                if (!isAdmin) {
                    await ctx.reply(config.messages.ADMIN_ONLY);
                    return false;
                }
            }
            catch (err) {
                Logger.error(`Error checking group admin permissions for user ${userId}:`, err);
                await ctx.reply("⚠️ Unable to verify administrator permissions.");
                return false;
            }
        }
    }
    // 6. Check args requirement
    if (command.args && args.length === 0) {
        let replyMsg = config.messages.MISSING_ARGS;
        replyMsg = replyMsg.replace("%usage%", `/${command.name} ${command.usage || ""}`);
        replyMsg = replyMsg.replace("%example%", command.examples ? `/${command.name} ${command.examples[0]}` : "None");
        await ctx.reply(replyMsg);
        return false;
    }
    // 7. Check cooldown
    if (options.cooldown && userId) {
        const cooldownKey = `${command.name}:${userId}`;
        const now = Date.now();
        const cooldownAmount = options.cooldown * 1000;
        const expirationTime = cooldowns.get(cooldownKey) || 0;
        if (now < expirationTime) {
            const timeLeft = ((expirationTime - now) / 1000).toFixed(1);
            await ctx.reply(config.messages.COOLDOWN.replace("%cooldown%", String(timeLeft)));
            return false;
        }
        cooldowns.set(cooldownKey, now + cooldownAmount);
        setTimeout(() => cooldowns.delete(cooldownKey), cooldownAmount);
    }
    return true;
}
