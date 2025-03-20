import { glob } from "glob";
import { bot } from "../index";
import { pathToFileURL } from "node:url";
import { Context, Telegraf } from "telegraf";

export interface Command {
  name: string;
  description?: string;
  execute: (ctx: Context, bot: Telegraf<Context>) => Promise<any>;
  disabled?: boolean;
}
async function loadCommands() {
  try {
    const Files = await glob(`${process.cwd()}/dist/Commands/**/*.js`);

    for (let file of Files) {
      file = pathToFileURL(file).toString();

      const commandFile = (await import(file)).default as { default: Command };
      const command = commandFile.default;

      if (!command || command.disabled || !command.name) {
        continue;
      }

      const commandName = command.name;
      try {
        bot.command(commandName, async (ctx: Context) => {
          try {
            await command.execute(ctx, bot)
          } catch (error) {
            console.error(`[CommandHandler] -`, error);
          }
        });
      } catch (error) {
        console.error(`[CommandHandler] -`, error);
      }
    }

    console.info(`[INFO] - Commands Loaded`);
  } catch (error) {
    console.error(`[CommandHandler] -`, error);
  }
}

loadCommands();