import { Context, Scenes } from "telegraf";

/**
 * Defines the custom session data structure for the bot.
 * Extends the default SceneSession to support Telegraf scenes natively.
 */
export interface SessionData extends Scenes.SceneSession<Scenes.WizardSessionData> {
  // You can add custom global session properties here!
  // These properties persist across the entire user session.
  name?: string;
  language?: string;
}

/**
 * Extends the default Telegraf Context to include custom session data and Scene/Wizard bindings.
 * This should be used across all commands, events, and UI buttons to ensure strict typing.
 */
export interface BotContext extends Context {
  // Session object is guaranteed when using session() middleware
  session: SessionData;
  
  // Scene objects are guaranteed when using stage.middleware()
  scene: Scenes.SceneContextScene<BotContext, Scenes.WizardSessionData>;
  wizard: Scenes.WizardContextWizard<BotContext>;
}
