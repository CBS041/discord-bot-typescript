# Discord Bot TypeScript

> A modern, feature-rich Discord bot built with TypeScript, Discord.js v14, and clean architecture principles.

## ✨ Features

- 🎯 **Modern Discord.js v14** - Latest Discord API features and slash commands
- 🔧 **TypeScript** - Full type safety and modern JavaScript features
- 🏗️ **Clean Architecture** - Modular, scalable, and maintainable codebase
- 🗃️ **MongoDB Integration** - Persistent data storage with Mongoose
- 🛡️ **Security** - Input validation, rate limiting, and secure configurations
- 🎨 **Rich Embeds** - Beautiful, interactive message embeds
- 📊 **Comprehensive Logging** - Structured logging with different levels
- 🧪 **Testing Ready** - Jest setup for unit and integration tests
- 🔄 **Hot Reload** - Fast development with nodemon
- 📦 **Modern Tooling** - ESLint, Prettier, Husky for code quality

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- MongoDB database
- Discord Bot Token

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/CBS041/discord-bot-typescript.git
   cd discord-bot-typescript
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Build and Start**
   ```bash
   # Development
   npm run dev

   # Production
   npm run build
   npm start
   ```

## 📋 Environment Variables

Create a `.env` file with the following variables:

```env
# Discord Configuration
TOKEN=your_discord_bot_token
OWNER_ID=your_discord_user_id

# Database Configuration
DATABASE_URL=mongodb://localhost:27017/discord-bot

# Optional Configuration
NODE_ENV=development
```

## 🛠️ Development

### Available Scripts

```bash
# Development
npm run dev          # Start with hot reload
npm run dev:debug    # Start with debugger

# Building
npm run build        # Compile TypeScript
npm run clean        # Clean build directory

# Code Quality
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues
npm run format       # Format with Prettier
npm run type-check   # TypeScript type checking

# Testing
npm test             # Run tests
npm run test:watch   # Run tests in watch mode
npm run test:coverage # Run tests with coverage
```

### Project Structure

```
src/
├── commands/           # Slash commands
│   └── information/    # Command categories
├── events/            # Discord event handlers
├── structures/        # Core classes and interfaces
├── database/          # Database models and connection
├── utils/             # Utility functions
└── index.ts          # Application entry point
```

### Adding New Commands

1. Create a new file in `src/commands/{category}/`
2. Follow the command interface:

```typescript
import { SlashCommandBuilder, ChatInputCommandInteraction } from 'discord.js';
import { Command } from '../../structures/interfaces';
import { ExtendedClient } from '../../structures/client';

export default {
  name: 'example',
  description: 'Example command',
  category: 'General',
  
  data: new SlashCommandBuilder()
    .setName('example')
    .setDescription('Example command'),

  async execute(interaction: ChatInputCommandInteraction, client: ExtendedClient) {
    await interaction.reply('Hello, World!');
  },
} satisfies Command;
```

### Adding New Events

1. Create a new file in `src/events/`
2. Follow the event pattern:

```typescript
import { Events } from 'discord.js';
import { ExtendedClient } from '../structures/client';

export default {
  name: Events.MessageCreate,
  async execute(message, client: ExtendedClient) {
    // Event logic here
  },
};
```

## 🏗️ Architecture

This bot follows clean architecture principles:

- **Domain Layer**: Business logic and entities (models, interfaces)
- **Application Layer**: Use cases and services (commands, events)
- **Infrastructure Layer**: External dependencies (database, Discord API)
- **Presentation Layer**: User interfaces (embeds, interactions)

## 🧪 Testing

Run the test suite:

```bash
# Run all tests
npm test

# Run with coverage
npm run test:coverage

# Watch mode for development
npm run test:watch
```

## 📝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Code Style

- Use TypeScript strict mode
- Follow ESLint and Prettier configurations
- Write tests for new features
- Use conventional commit messages

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Support

- Create an [Issue](https://github.com/CBS041/discord-bot-typescript/issues) for bug reports
- Join our [Discord Server](https://discord.gg/example) for community support
- Check the [Wiki](https://github.com/CBS041/discord-bot-typescript/wiki) for detailed documentation

## 🙏 Acknowledgments

- [Discord.js](https://discord.js.org/) - Powerful Discord API library
- [Mongoose](https://mongoosejs.com/) - MongoDB object modeling
- [TypeScript](https://www.typescriptlang.org/) - JavaScript with types

---

Made with ❤️ by [Cassiano](https://github.com/CBS041)