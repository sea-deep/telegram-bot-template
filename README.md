<div align="center">
  <h1>🤖 Telegram Bot Template</h1>
  <p><i>A structured, modular, and professional template for building robust <a href="https://telegraf.js.org/">Telegraf v4</a> bots in TypeScript.</i></p>
  
  <p>
    <a href="https://telegraf.js.org/"><img src="https://img.shields.io/badge/Telegraf-v4-blue?style=for-the-badge&logo=telegram" alt="Telegraf v4" /></a>
    <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/TypeScript-Ready-blue?style=for-the-badge&logo=typescript" alt="TypeScript" /></a>
    <a href="https://nodejs.org/"><img src="https://img.shields.io/badge/Node.js-v20+-green?style=for-the-badge&logo=node.js" alt="Node.js" /></a>
  </p>
</div>

---

## 📁 Repository Structure

Where to place your code:

- `src/configs/config.ts`: Define your bot's static configurations, developer IDs, and global reply messages here.
- `src/commands/`: Place strict Slash Commands (`/command`) here.
- `src/inlineButtons/`: Place handlers for `callback_query` (Inline Keyboard button clicks) here.
- `src/keyboardButtons/`: Place strict handlers for Reply Keyboard text clicks here.
- `src/events/`: Place your standard Telegram event listeners (like `new_chat_members`, `inline_query`) here.

---

## ✨ Features

This template abstracts away the boilerplate of registering commands and strict middleware routing for the Telegram API. 

- **Component Routing**: Supports granular, file-based routing for **Slash Commands**, **Inline Buttons**, **Keyboard Buttons**, and **Inline Queries (Autocomplete)**. Handlers automatically register themselves on boot without cluttering a central file.
- **Built-in Execution Guards**: Intercept commands globally before execution. Support for `ownerOnly`, `developerOnly`, `adminOnly`, `privateOnly`, `groupOnly`, missing argument enforcement, and per-user `cooldown` rates natively baked in.
- **Strict Middleware Architecture**: Middleware execution is strictly ordered (`Commands` > `Inline Buttons` > `Keyboard Buttons` > `Events`) to completely eliminate the infamous Telegraf "swallowed update" collisions.
- **Centralized Configuration**: All environment secrets are validated safely through Zod in `env.ts`, while all non-secret logic (like permission messages and feature toggles) are extracted into `config.ts` for clean separation.

> 📖 **[Read the Wiki](https://github.com/sea-deep/telegram-bot-template/wiki)** to learn how to create these commands and map your components.

---

## 🚀 Quickstart

### Prerequisites
- [Node.js](https://nodejs.org/) v20 or higher
- A Telegram Bot Token (from [@BotFather](https://t.me/BotFather) on Telegram)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/sea-deep/telegram-bot-template.git
   cd telegram-bot-template
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment**
   Copy the example environment file and update it with your credentials:
   ```bash
   cp .env.example .env
   ```
   > 🔑 *Open `.env` and insert your `BOT_TOKEN`.*

4. **Enable BotFather Features (Optional but Recommended)**
   Message `@BotFather` on Telegram and use:
   - `/setcommands` to add your bot's slash commands to the UI menu.
   - `/setinline` to enable Inline Queries (autocomplete).

---

## 💻 Running the Bot

| Mode | Command | Description |
| :--- | :--- | :--- |
| **Development** | `npm run dev` | Runs the bot with hot-reloading via `tsx`. |
| **Production** | `npm run build && npm start` | Compiles the TypeScript to `dist/` and starts the Node process. |

---

## 🤝 Contributing, Issues, & Discussions

We welcome all contributions! If you have a question, want to suggest a feature, or found a bug:
- **Discussions**: Have an idea or need help? Start a thread in our [Discussions](#) tab.
- **Issues**: Found a bug? Open an [Issue](#) with reproducible steps.
- **Contributing**: Check out our [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines on submitting Pull Requests.

---

## 📚 Documentation

> [!IMPORTANT]  
> Detailed technical guides, including a comprehensive **Beginner's Getting Started Guide**, can be found in the **[GitHub Wiki](https://github.com/sea-deep/telegram-bot-template/wiki)**.

---

## 📄 License

This project is licensed under the [GPL-3.0 License](./LICENSE).