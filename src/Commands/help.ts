import { Context, Markup, Telegraf } from "telegraf";
import { Command } from "../Utils/commandHandler";
import { glob } from "glob";
import { pathToFileURL } from "node:url";
import { removeKeyboard } from "telegraf/markup";


let commands: Array<Object> = [];
async function loadCommands() {
    const commandFiles = await glob(`${process.cwd()}/dist/Commands/**/*.js`);

    for (let file of commandFiles) {
        file = pathToFileURL(file).toString();
        const commandFile = (await import(file)).default as { default: Command };
        const command = commandFile.default;
        if (!command || command.disabled || !command.name) {
            continue;
        }
        commands.push({ name: command.name, description: command.description });
    }
}
loadCommands();

export default {
    name: "help",
    description: "Show the available commands",
    execute: async (ctx: Context, bot: Telegraf<Context>) => {
        await ctx.replyWithMarkdownV2("__*Here are the available commands:*__\n\n" + commands.map((command: any) => `/${command.name} \\- ${command.description}`).join("\n"), removeKeyboard());
    }
} as Command;