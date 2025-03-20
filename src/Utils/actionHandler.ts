import { glob } from "glob";
import { pathToFileURL } from "node:url";
import { bot } from "../index";
import { Context, Telegraf } from "telegraf";

// Because it doesn't know that ctx has a match property. by default, Context<Update> doesn’t include match, but telegraf adds it dynamically when using regex triggers.
export interface ActionContext extends Context {
    match?: RegExpMatchArray;
}

export interface Action {
    name: string | RegExp;
    execute: (ctx: ActionContext, bot: Telegraf<Context>) => Promise<any>;
    disabled?: boolean;
}

async function loadActions() {
    try {
        const Files = await glob(`${process.cwd()}/dist/Actions/**/*.js`);

        for (let file of Files) {
            file = pathToFileURL(file).toString();
            const actionFile = (await import(file)).default as { default: Action };
            const action = actionFile.default;

            if (action.disabled) continue;

            const actionName = action.name;
            if (!actionName) continue;

            try {
                bot.action(actionName, async (ctx) => {
                    try {
                        await action.execute(ctx, bot);
                    } catch (err) {
                        console.error(`[ActionHandler] - Error in "${actionName}":\n`, err);
                    }
                });
            } catch (error) {
                console.error(`[ActionHandler] -`, error);
            }
        }
        console.info(`[INFO] - Actions Loaded`);
    } catch (err) {
        console.error(`[ActionHandler] -`, err);
    }
}

loadActions();
