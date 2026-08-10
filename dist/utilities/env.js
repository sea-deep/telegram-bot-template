import { z } from "zod";
import "dotenv/config";
import { Logger } from "../helpers/Logger.js";
const envSchema = z.object({
    BOT_TOKEN: z.string().min(1, "BOT_TOKEN is required in the environment variables."),
    NODE_ENV: z.enum(["development", "production"]).default("development"),
});
// Parse and validate the environment variables
const _env = envSchema.safeParse(process.env);
if (!_env.success) {
    Logger.error("❌ Invalid environment variables:");
    _env.error.issues.forEach((issue) => {
        Logger.error(`  - ${issue.path.join(".")}: ${issue.message}`);
    });
    process.exit(1);
}
export const env = _env.data;
