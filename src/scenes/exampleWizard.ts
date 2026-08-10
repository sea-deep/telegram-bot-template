import { Scenes } from "telegraf";
import { BotContext } from "../structures/BotContext.js";

/**
 * A basic 3-step wizard scene that asks for a name and age.
 */
const exampleWizard = new Scenes.WizardScene<BotContext>(
  "EXAMPLE_WIZARD",
  // Step 1: Ask for name
  async (ctx) => {
    await ctx.reply("Welcome to the Example Wizard! What is your name?");
    return ctx.wizard.next();
  },
  // Step 2: Validate name, ask for age
  async (ctx) => {
    if (!ctx.message || !("text" in ctx.message)) {
      await ctx.reply("Please send a text message with your name.");
      return; // Keep them in this step
    }
    
    // Save state in the global session
    ctx.session.name = ctx.message.text;

    await ctx.reply(`Nice to meet you, ${ctx.session.name}! How old are you?`);
    return ctx.wizard.next();
  },
  // Step 3: Validate age, finish
  async (ctx) => {
    if (!ctx.message || !("text" in ctx.message)) {
      await ctx.reply("Please send a valid number for your age.");
      return;
    }

    const age = parseInt(ctx.message.text, 10);
    if (isNaN(age)) {
      await ctx.reply("That doesn't look like a number! Try again.");
      return;
    }

    await ctx.reply(
      `Awesome! You are ${ctx.session.name} and you are ${age} years old. Exiting wizard.`
    );
    return ctx.scene.leave();
  }
);

// We must define custom types if we want strict typing for ctx.scene.session.name
// We'll augment our SessionData in BotContext.ts, or just define it inline for the wizard.
interface WizardSession extends Scenes.WizardSessionData {
  name: string;
}

export default exampleWizard;
