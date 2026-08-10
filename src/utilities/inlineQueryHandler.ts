import { Telegraf, Context } from "telegraf";
import { InlineQuery } from "../structures/InlineQuery.js";
import { resolveFiles } from "./pathResolver.js";
import { Logger } from "../helpers/Logger.js";
import config from "../configs/config.js";

export const inlineQueriesMap = new Map<string | RegExp | Array<string | RegExp>, InlineQuery>();
const cooldowns = new Map<string, number>();

async function checkInlineGuards(ctx: Context, query: InlineQuery): Promise<boolean> {
  const options = query.options || {};
  const userId = ctx.from?.id;

  if (options.disabled) return false;

  if (options.ownerOnly) {
    if (!userId || config.users.ownerId !== String(userId)) {
      await ctx.answerInlineQuery([{
        type: "article",
        id: "error_owner",
        title: "Access Denied",
        description: config.messages.NOT_BOT_OWNER,
        input_message_content: { message_text: config.messages.NOT_BOT_OWNER }
      }]);
      return false;
    }
  }

  if (options.developerOnly) {
    if (!userId || (!config.users.developers.includes(String(userId)) && config.users.ownerId !== String(userId))) {
      await ctx.answerInlineQuery([{
        type: "article",
        id: "error_dev",
        title: "Access Denied",
        description: config.messages.NOT_BOT_DEVELOPER,
        input_message_content: { message_text: config.messages.NOT_BOT_DEVELOPER }
      }]);
      return false;
    }
  }

  if (options.cooldown && userId) {
    const cooldownKey = `inline:${userId}`;
    const now = Date.now();
    const cooldownAmount = options.cooldown * 1000;
    const expirationTime = cooldowns.get(cooldownKey) || 0;

    if (now < expirationTime) {
      const timeLeft = ((expirationTime - now) / 1000).toFixed(1);
      const msg = config.messages.COOLDOWN.replace("%cooldown%", String(timeLeft));
      await ctx.answerInlineQuery([{
        type: "article",
        id: "error_cooldown",
        title: "Cooldown Active",
        description: msg,
        input_message_content: { message_text: msg }
      }]);
      return false;
    }

    cooldowns.set(cooldownKey, now + cooldownAmount);
    setTimeout(() => cooldowns.delete(cooldownKey), cooldownAmount);
  }

  return true;
}

export async function loadInlineQueries(bot: Telegraf<Context>): Promise<void> {
  inlineQueriesMap.clear();

  try {
    const fileUrls = await resolveFiles("inlineQueries");

    for (const fileUrl of fileUrls) {
      const module = await import(fileUrl);
      const query: InlineQuery = module.default;

      if (!query || !query.name) {
        continue;
      }

      if (query.options?.disabled) {
        Logger.debug(`Skipping disabled inline query: ${query.name}`);
        continue;
      }

      inlineQueriesMap.set(query.name, query);

      bot.inlineQuery(query.name, async (ctx) => {
        try {
          const allowed = await checkInlineGuards(ctx, query);
          if (!allowed) return;

          await query.execute(ctx as unknown as import("../structures/InlineQuery.js").InlineContext, bot);
        } catch (error) {
          Logger.error(`Error executing inline query ${query.name}:`, error);
        }
      });
    }

    Logger.info(`[InlineQueryHandler] - Loaded ${inlineQueriesMap.size} inline querie(s)`);
  } catch (error) {
    Logger.error("[InlineQueryHandler] - Error loading inline queries:", error);
  }
}
