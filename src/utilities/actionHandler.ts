import { Telegraf, Context } from "telegraf";
import { Action, ActionContext } from "../structures/Action.js";
import { resolveFiles } from "./pathResolver.js";
import { Logger } from "../helpers/Logger.js";

export async function loadActions(bot: Telegraf<Context>): Promise<void> {
  try {
    const fileUrls = await resolveFiles("actions");
    let count = 0;

    for (const fileUrl of fileUrls) {
      const module = await import(fileUrl);
      const action: Action = module.default;

      if (!action || !action.name || action.disabled) {
        continue;
      }

      bot.action(action.name, async (ctx) => {
        try {
          await action.execute(ctx as ActionContext, bot);
        } catch (error) {
          Logger.error(`Error in action handler "${String(action.name)}":`, error);
        }
      });

      count++;
    }

    Logger.info(`[ActionHandler] - Loaded ${count} action(s)`);
  } catch (error) {
    Logger.error("[ActionHandler] - Error loading actions:", error);
  }
}
