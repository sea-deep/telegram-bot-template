import { Telegraf } from "telegraf";
import { BotContext } from "./BotContext.js";

export interface ActionContext extends BotContext {
  match?: RegExpMatchArray | RegExpExecArray;
}

export interface InlineButton {
  /** The payload expected back from the callback_query. */
  customId: string | string[] | RegExp;
  disabled?: boolean;
  execute: (ctx: BotContext & { match?: RegExpExecArray | RegExpMatchArray }, bot: Telegraf<BotContext>) => Promise<void> | void;
}
