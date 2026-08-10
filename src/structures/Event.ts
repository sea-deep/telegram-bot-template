import { Context, Telegraf } from "telegraf";
import { Update } from "telegraf/types";

export type EventFilter =
  | Parameters<Telegraf<Context>["on"]>[0]
  | ((update: Update) => boolean);

export interface Event {
  type: EventFilter | EventFilter[];
  disabled?: boolean;
  execute: (ctx: Context, bot: Telegraf<Context>) => Promise<void> | void;
}
