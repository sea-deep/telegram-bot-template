import { glob } from "glob";
import { pathToFileURL } from "node:url";
import { bot } from "../index";
import { Context, Telegraf } from "telegraf";


export interface Event {
  type: any;
  execute: (ctx: Context, bot: Telegraf<Context>) => Promise<any>;
  disabled?: boolean;
}

async function loadEvents() {
  try {
    const Files = await glob(`${process.cwd()}/dist/Events/**/*.js`);

    for (let file of Files) {
      file = pathToFileURL(file).toString();
      const eventFile = (await import(file)).default as { default: Event };
      const event = eventFile.default;

      if (event.disabled) continue;

      const eventType = event.type;
      if (!eventType) continue;

      try {
        bot.on(eventType, async (ctx: Context) => {
          try {
            await event.execute(ctx, bot)
          }
          catch (error) {
            console.error(`[EventHandler] -`, error);
          }
        }
        );
      } catch (error) {
        console.error(`[EventHandler] -`, error);
      }
    }
    console.info(`[INFO] - Events Loaded`);
  } catch (err) {
    console.error(`[EventHandler] -`, err);
  }
}

loadEvents();
