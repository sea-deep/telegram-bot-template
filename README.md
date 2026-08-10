# Telegram Bot Template 🚀

A production-ready, state-of-the-art template for building Telegram bots using **Telegraf v4**, **TypeScript**, and **Node.js ESM**.

---

## 🌟 Key Features

- ⚡ **ESM Native (`"type": "module"`)**: Fully modernized with Node ESM imports & TypeScript NodeNext resolution.
- 🛡️ **Execution Guards (`CommandOptions.ts`)**: Built-in flags for `ownerOnly`, `adminOnly`, `privateOnly`, `groupOnly`, `cooldown`, and `disabled`.
- 🔐 **Zod Environment Validation (`env.ts`)**: Validates environment variables (`BOT_TOKEN`, `OWNER_IDS`, `NODE_ENV`) at startup.
- 🎯 **Strict Type Safety**: 100% strictly typed with zero `any` usage.
- 🔄 **Dynamic Path Loader (`pathResolver.ts`)**: Seamless file loading supporting both `.ts` (dev via `tsx`) and `.js` (prod via `dist/`).
- 📁 **Command Categorization**: Dynamic command categories for structured `/help` listings.
- 🤖 **Auto Telegram UI Menu Sync (`setMyCommands`)**: Registers slash commands automatically in Telegram UI autocomplete menus upon bot launch.
- 🎨 **Telegraf `fmt` Utilities**: Type-safe message formatting with `telegraf/format`.
- 🐳 **Docker & Docker Compose Ready**: Multi-stage `Dockerfile` (`node:20-alpine`) for production deployments.

---

## 📁 Project Structure

```
telegram-bot-template/
├── src/
│   ├── structures/         # Type contracts (Command, Event, Action, TextTrigger)
│   │   ├── Command.ts
│   │   ├── Event.ts
│   │   ├── Action.ts
│   │   └── TextTrigger.ts
│   ├── utilities/          # Loaders, environment, guards, path resolver
│   │   ├── commandHandler.ts
│   │   ├── eventHandler.ts
│   │   ├── actionHandler.ts
│   │   ├── textHandler.ts
│   │   ├── CommandOptions.ts
│   │   ├── env.ts
│   │   └── pathResolver.ts
│   ├── helpers/            # Helper utilities
│   │   └── Logger.ts
│   ├── commands/           # Bot slash commands (/start, /help, /ping, etc.)
│   ├── events/             # Bot event listeners (newChatMembers, etc.)
│   ├── actions/            # Inline keyboard callback query handlers
│   ├── textTriggers/       # Text triggers and reply keyboard handlers
│   └── index.ts            # Main application entrypoint
├── Dockerfile              # Multi-stage production container build
├── docker-compose.yml      # Docker compose configuration
├── tsconfig.json           # TypeScript configuration (ESM NodeNext)
├── package.json            # NPM scripts & dependencies
└── .env.example            # Environment variables template
```

---

## 🚀 Quick Start

### 1. Clone & Install

```bash
git clone https://github.com/sea-deep/telegram-bot-template.git my-bot
cd my-bot
npm install
```

### 2. Configure Environment

Copy `.env.example` to `.env` and fill in your details:

```env
BOT_TOKEN="your_bot_token_from_botfather"
OWNER_IDS="123456789,987654321"
NODE_ENV="development"
```

### 3. Development Mode

Run with live watch & reload via `tsx`:

```bash
npm run dev
```

### 4. Build & Production Start

Compile TypeScript to `dist/` and start the production process:

```bash
npm start
```

---

## 🛡️ Built-in Command Execution Guards

Specify guards directly on your `Command` definitions:

```typescript
import { fmt, bold } from "telegraf/format";
import { Command } from "../structures/Command.js";

const adminCommand: Command = {
  name: "admin",
  description: "Group admin command",
  category: "Admin",
  options: {
    adminOnly: true,    // Restrict to group admins
    groupOnly: true,    // Restrict to group chats
    cooldown: 5,        // 5 seconds cooldown per user
  },
  execute: async (ctx) => {
    await ctx.reply(fmt`${bold("Admin panel accessed!")}`);
  },
};

export default adminCommand;
```

### Supported Guards:
| Flag | Description |
| :--- | :--- |
| `ownerOnly` | Restricts command to IDs listed in `OWNER_IDS`. |
| `adminOnly` | Restricts command to group administrators. |
| `privateOnly` | Restricts command to private direct messages. |
| `groupOnly` | Restricts command to group/supergroup chats. |
| `cooldown` | Cooldown period in seconds per user per command. |
| `disabled` | Disables the command entirely. |

---

## 🐳 Docker Deployment

Run with Docker Compose:

```bash
docker-compose up -d --build
```

Or build and run manually:

```bash
docker build -t telegram-bot .
docker run -d --env-file .env telegram-bot
```

---

## 📦 Scripts Summary

- `npm run dev`: Start bot in dev watch mode with `tsx`.
- `npm run build`: Clean `dist` and compile TypeScript.
- `npm start`: Build and launch production server (`node dist/index.js`).
- `npm run clean`: Remove output build directory.

---

## 📄 License

[ISC](https://opensource.org/licenses/ISC)