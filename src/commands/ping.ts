import { fmt, bold, code } from "telegraf/format";
import { Command } from "../structures/Command.js";

const pingCommand: Command = {
  name: "ping",
  description: "Check bot latency and operational status",
  category: "Utility",
  options: {
    cooldown: 3,
  },
  execute: async (ctx, bot, args) => {
    const start = Date.now();
    const sentMsg = await ctx.reply("🏓 Pinging...");
    const latency = Date.now() - start;

    await ctx.telegram.editMessageText(
      ctx.chat?.id,
      sentMsg.message_id,
      undefined,
      fmt`🏓 ${bold("Pong!")}\n⚡ Latency: ${code(`${latency}ms`)}`
    );
  },
};

export default pingCommand;
