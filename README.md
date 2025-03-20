# Telegram Bot Template

A powerful and easy-to-use template for creating Telegram bots using Telegraf.js and TypeScript. This template provides a structured approach to building feature-rich bots with proper separation of concerns. This readme was written by GitHub Copilot cuz I'm lazy.

## 🌟 Features

- 🔌 Modular architecture with handlers for commands, events, text triggers, and actions
- 📂 Organized folder structure for easy maintenance
- 🔄 Hot reloading for development
- 🛠️ TypeScript for type safety and better development experience
- 🔧 Built-in error handling
- 🚀 Easy deployment configuration

## 📋 Prerequisites

- Node.js (v14 or newer)
- npm or yarn
- A Telegram Bot Token (obtainable from [@BotFather](https://t.me/BotFather))

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/sea-deep/telegram-bot-template.git MyBot
cd MyBot
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the root directory:

```
BOT_TOKEN=your_telegram_bot_token_here
```

### 4. Build and start the bot

```bash
npm run start
```

## 📚 Project Structure

```
MyBot/
├── src/
│   ├── Commands/         # Command handlers (/start, /help, etc.)
│   ├── Events/           # Event handlers (new joins, photos, etc.)
│   ├── TextTriggers/     # Text message triggers
│   ├── Actions/          # Callback query handlers
│   ├── Utils/            # Utility functions and handlers
│   │   ├── commandHandler.ts
│   │   ├── eventHandler.ts
│   │   ├── textHandler.ts
│   │   └── actionHandler.ts
│   └── index.ts          # Entry point
├── dist/                 # Compiled JavaScript files
├── .env                  # Environment variables
└── package.json          # Project metadata and dependencies
```

## 📝 How to Use

### Creating a Command

Create a new file in the `src/Commands` directory:

```typescript
// src/Commands/start.ts
import { Command } from "../Utils/commandHandler";
import { Context, Markup } from "telegraf";

export default {
  name: "start",
  description: "Start the bot",
  execute: async (ctx: Context) => {
    await ctx.reply(
      "Welcome to ReefBot! 🌊",
      Markup.keyboard([
        ["🐠 🌊 🐙 🐬 Parameters", "⚙️ 🔧 🔨 🛠️ Settings"],
        ["❓ 💭 💡 📝 Help"]
      ]).resize()
    );
  }
} as Command;
```

### Creating an Event Handler

Create a new file in the `src/Events` directory:

```typescript
// src/Events/message.ts
import { Event } from "../Utils/eventHandler";
import { Context } from "telegraf";

export default {
  type: "message",
  execute: async (ctx: Context) => {
    console.log("Received a message:", ctx.message);
    // Handle the message event
  }
} as Event;
```

### Creating a Text Trigger

Create a new file in the `src/TextTriggers` directory:

```typescript
// src/TextTriggers/hello.ts
import { TextTrigger, TextContext } from "../Utils/textHandler";

export default {
  name: /hello/i,  // Can be a string or RegExp
  execute: async (ctx: TextContext) => {
    await ctx.reply("Hello there! 👋");
  }
} as TextTrigger;
```

### Creating an Action Handler

Create a new file in the `src/Actions` directory:

```typescript
// src/Actions/buttonClick.ts
import { Action, ActionContext } from "../Utils/actionHandler";

export default {
  name: "button_click",  // Matches the callback_data of your buttons
  execute: async (ctx: ActionContext) => {
    await ctx.answerCbQuery("Button clicked!");
    await ctx.editMessageText("You clicked the button!");
  }
} as Action;
```

## 📦 Available Scripts

- `npm run start` - Build and start the bot
- `npm run build` - Build the project
- `npm run clean` - Remove the dist directory

## 🔧 Advanced Configuration

### Adding Middleware

You can add middleware to your bot in the `index.ts` file:

```typescript
import { session } from "telegraf";

// Add session support
bot.use(session());

// Add custom middleware
bot.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date().getTime() - start.getTime();
  console.log("Response time: %sms", ms);
});
```

## 🚀 Deployment

### Hosting Providers

- [Render](https://render.com)
- [DigitalOcean](https://www.digitalocean.com)
- [Railway](https://railway.app)
- [Fly.io](https://fly.io)

### Basic Deployment Steps

1. Build your project:
   ```bash
   npm run build
   ```

2. Start in production:
   ```bash
   node dist/index.js
   ```

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/yourusername/reefbot/issues).

## 📄 License

This project is [ISC](https://opensource.org/licenses/ISC) licensed.