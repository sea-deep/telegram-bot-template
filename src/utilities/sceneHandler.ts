import { Telegraf, Scenes } from "telegraf";
import { BotContext } from "../structures/BotContext.js";
import { resolveFiles } from "./pathResolver.js";
import { Logger } from "../helpers/Logger.js";

// Initialize a global stage
export const stage = new Scenes.Stage<BotContext>([]);

export async function loadScenes(): Promise<void> {
  try {
    const fileUrls = await resolveFiles("scenes");
    let count = 0;

    for (const fileUrl of fileUrls) {
      const module = await import(fileUrl);
      const scene = module.default;

      if (!scene || !scene.id) {
        continue;
      }

      stage.register(scene);
      count++;
    }

    Logger.info(`[SceneHandler] - Loaded ${count} scene(s) into stage`);
  } catch (error) {
    Logger.error("[SceneHandler] - Error loading scenes:", error);
  }
}
