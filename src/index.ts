import 'dotenv/config';

import { connectDatabase } from './database/connection';
import { ExtendedClient } from './structures/client';
import { validateEnvironment } from './utils/environment';
import { logger } from './utils/logger';

async function main() {
  try {
    // Validate environment variables
    const env = validateEnvironment();

    // Connect to database
    await connectDatabase(env.DATABASE_URL);

    // Initialize client with modern intents
    const client = new ExtendedClient({
      intents: ['Guilds', 'GuildMessages', 'GuildMembers', 'MessageContent'],
    });

    // Handle graceful shutdown
    process.on('SIGINT', async () => {
      logger.info('Received SIGINT, shutting down gracefully...');
      client.destroy();
      process.exit(0);
    });

    process.on('SIGTERM', async () => {
      logger.info('Received SIGTERM, shutting down gracefully...');
      client.destroy();
      process.exit(0);
    });

    // Login to Discord
    await client.login(env.TOKEN);
  } catch (error) {
    logger.error('Failed to start bot:', error);
    process.exit(1);
  }
}

main();
