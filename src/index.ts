import 'dotenv/config';

import { connectDatabase } from './database/connection';
import { ExtendedClient } from './structures/client';

async function main() {
  try {
    // Connect to database
    await connectDatabase(process.env.DATABASE_URL);

    // Initialize client with modern intents
    const client = new ExtendedClient({
      intents: ['Guilds', 'GuildMessages', 'GuildMembers', 'MessageContent'],
    });

    // Login to Discord
    await client.login(process.env.TOKEN);
  } catch (error) {
    console.error('Failed to start bot:', error);
    process.exit(1);
  }
}

main();
