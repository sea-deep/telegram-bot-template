import { Context, Telegraf } from "telegraf";

export interface ActionContext extends Context {
  match?: RegExpMatchArray | RegExpExecArray;
}

export interface InlineButton {
  name: string | string[] | RegExp;
  disabled?: boolean;
  execute: (ctx: Context & { match?: RegExpExecArray | RegExpMatchArray }, bot: Telegraf<Context>) => Promise<void> | void;
}
