import { glob } from "glob";
import { pathToFileURL } from "node:url";
import { bot } from "../index";
import { Context, Telegraf } from "telegraf";

// Because it doesn't know that ctx has a match property. by default, Context<Update> doesn’t include match, but telegraf adds it dynamically when using regex triggers.
export interface TextContext extends Context {
    match?: RegExpMatchArray;
}

export interface TextTrigger {
    name: string | RegExp;
    execute: (ctx: TextContext, bot: Telegraf<Context>) => Promise<any>;
    disabled?: boolean;
}

async function loadTexts() {
    try {
        const Files = await glob(`${process.cwd()}/dist/TextTriggers/**/*.js`);

        for (let file of Files) {
            file = pathToFileURL(file).toString();
            const textFile = (await import(file)).default as { default: TextTrigger };
            const text = textFile.default;

            if (text.disabled) continue;

            const textName = text.name;
            if (!textName) continue;

            try {
                bot.hears(textName, async (ctx) => {
                    try {
                      await text.execute(ctx, bot);
                    } catch (err) {
                        console.error(`[TextHandler] - Error in "${textName}":\n`, err);
                    }
                });
            } catch (error) {
                console.error(`[TextHandler] -`, error);
            }
        }
        console.info(`[INFO] - Text Triggers Loaded`);
    } catch (err) {
        console.error(`[TextHandler] -`, err);
    }
}

loadTexts();