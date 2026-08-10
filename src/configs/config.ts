export interface ConfigSchema {
  users: {
    ownerId: string;
    developers: string[];
  };
  messages: {
    NOT_BOT_OWNER: string;
    NOT_BOT_DEVELOPER: string;
    PRIVATE_ONLY: string;
    GROUP_ONLY: string;
    ADMIN_ONLY: string;
    COOLDOWN: string;
    MISSING_ARGS: string;
  };
}

const config: ConfigSchema = {
  users: {
    ownerId: "123456789", // Replace with actual bot owner Telegram ID
    developers: [],       // Array of developer Telegram IDs
  },
  messages: {
    NOT_BOT_OWNER: "❌ You do not have permission to run this command because you're not the bot owner!",
    NOT_BOT_DEVELOPER: "❌ You do not have permission to run this command because you're not a developer!",
    PRIVATE_ONLY: "⚠️ This command can only be used in private messages.",
    GROUP_ONLY: "⚠️ This command can only be used in group chats.",
    ADMIN_ONLY: "⚠️ This command is restricted to group administrators.",
    COOLDOWN: "⏳ Please wait `%cooldown%` second(s) before reusing this command.",
    MISSING_ARGS: "⚠️ Missing arguments! Usage: `%usage%`\nExample: `%example%`",
  },
};

export default config;
