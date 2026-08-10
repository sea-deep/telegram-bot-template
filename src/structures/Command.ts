import { Context, Telegraf } from "telegraf";
import { CommandOptions } from "../utilities/CommandOptions.js";

export interface Command {
  name: string;
  description: string;
  category?: string;
  aliases?: string[];
  usage?: string;
  examples?: string[];
  args?: boolean;
  ownerOnly?: boolean;
  developerOnly?: boolean;
  hideFromMenu?: boolean;
  options?: CommandOptions;
  disabled?: boolean;
  execute: (ctx: Context, bot: Telegraf<Context>, args: string[]) => Promise<void> | void;
}
