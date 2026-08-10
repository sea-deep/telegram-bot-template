import { Telegraf, NarrowedContext } from "telegraf";
import { BotContext } from "./BotContext.js";
import { Update } from "telegraf/types";

export type KeyboardContext = NarrowedContext<BotContext, Update.MessageUpdate>;

export interface KeyboardButton {
  name: string | RegExp | Array<string | RegExp>;
  disabled?: boolean;
  execute: (ctx: KeyboardContext, bot: Telegraf<BotContext>) => Promise<void> | void;
}
