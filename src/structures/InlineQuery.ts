import { Context, Telegraf } from "telegraf";
import { CommandOptions } from "../utilities/CommandOptions.js";

export interface InlineContext extends Context {
  inlineQuery: NonNullable<Context["inlineQuery"]>;
}

export interface InlineQuery {
  /**
   * The trigger matching the inline query text.
   * Note: Telegraf's bot.inlineQuery supports string, RegExp, or arrays.
   */
  name: string | RegExp | Array<string | RegExp>;
  
  /**
   * Optional guards (ownerOnly, developerOnly, cooldown, etc.)
   * Note: adminOnly, groupOnly, privateOnly do not apply to inline queries.
   */
  options?: Pick<CommandOptions, "ownerOnly" | "developerOnly" | "cooldown" | "disabled">;
  
  /**
   * The execution block for the inline query.
   * You MUST call `ctx.answerInlineQuery(...)` inside this block.
   */
  execute: (ctx: InlineContext, bot: Telegraf<Context>) => Promise<void> | void;
}
