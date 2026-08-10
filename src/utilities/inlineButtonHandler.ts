import { Telegraf, Context } from "telegraf";
import { InlineButton } from "../structures/InlineButton.js";
import { resolveFiles } from "./pathResolver.js";
import { Logger } from "../helpers/Logger.js";

export const inlineButtonsMap = new Map<string | RegExp | string[], InlineButton>();

export async function loadInlineButtons(bot: Telegraf<Context>): Promise<void> {
  inlineButtonsMap.clear();

  try {
    const fileUrls = await resolveFiles("inlineButtons");

    for (const fileUrl of fileUrls) {
      const module = await import(fileUrl);
      const button: InlineButton = module.default;

      if (!button || !button.name) {
        continue;
      }

      if (button.disabled) {
        Logger.debug(`Skipping disabled inline button: ${button.name}`);
        continue;
      }

      inlineButtonsMap.set(button.name, button);

      bot.action(button.name, async (ctx) => {
        try {
          await button.execute(ctx, bot);
        } catch (error) {
          Logger.error(`Error executing inline button ${button.name}:`, error);
        }
      });
    }

    Logger.info(`[InlineButtonHandler] - Loaded ${inlineButtonsMap.size} inline button(s)`);
  } catch (error) {
    Logger.error("[InlineButtonHandler] - Error loading inline buttons:", error);
  }
}
