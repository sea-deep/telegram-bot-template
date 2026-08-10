import { Context, Telegraf } from "telegraf";

export interface ChosenContext extends Context {
  chosenInlineResult: NonNullable<Context["chosenInlineResult"]>;
}

export interface ChosenInlineResult {
  /**
   * The result ID to match.
   * Matches against the ID of the result the user selected.
   */
  name: string | RegExp | Array<string | RegExp>;
  
  /** Disable this result handler */
  disabled?: boolean;

  /**
   * Execution block for when a user selects the inline result.
   */
  execute: (ctx: ChosenContext, bot: Telegraf<Context>) => Promise<void> | void;
}
