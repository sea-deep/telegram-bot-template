import { Context, Telegraf, NarrowedContext } from "telegraf";
import { Update } from "telegraf/types";

export type KeyboardContext = NarrowedContext<Context, Update.MessageUpdate>;

export interface KeyboardButton {
  name: string | RegExp | Array<string | RegExp>;
  disabled?: boolean;
  execute: (ctx: KeyboardContext, bot: Telegraf<Context>) => Promise<void> | void;
}
