import { Context, Telegraf } from "telegraf";

export interface TextContext extends Context {
  match?: RegExpMatchArray | RegExpExecArray;
}

export interface TextTrigger {
  name: string | RegExp | Array<string | RegExp>;
  disabled?: boolean;
  execute: (ctx: TextContext, bot: Telegraf<Context>) => Promise<void> | void;
}
