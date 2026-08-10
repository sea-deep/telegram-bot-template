import { z } from "zod";
import * as dotenv from "dotenv";
import { Logger } from "../helpers/Logger.js";

dotenv.config();

const envSchema = z.object({
  BOT_TOKEN: z.string().min(1, "BOT_TOKEN must be provided in environment variables or .env"),
  OWNER_IDS: z
    .string()
    .optional()
    .transform((val) =>
      val
        ? val
            .split(",")
            .map((id) => id.trim())
            .filter((id) => id.length > 0)
        : []
    ),
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  UNKNOWN_COMMAND_MESSAGE: z
    .string()
    .default("⚠️ Command not found. Use /help to see the list of available commands."),
});

const parseResult = envSchema.safeParse(process.env);

if (!parseResult.success) {
  Logger.error("❌ Environment validation failed:");
  parseResult.error.issues.forEach((issue) => {
    Logger.error(`   - ${issue.path.join(".")}: ${issue.message}`);
  });
  process.exit(1);
}

export const env = parseResult.data;
