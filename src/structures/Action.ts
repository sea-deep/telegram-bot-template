import { Context, Telegraf } from "telegraf";

export interface ActionContext extends Context {
  match?: RegExpMatchArray | RegExpExecArray;
}

export interface Action {
  name: string | RegExp | Array<string | RegExp>;
  disabled?: boolean;
  execute: (ctx: ActionContext, bot: Telegraf<Context>) => Promise<void> | void;
}
