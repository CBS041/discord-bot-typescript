import { Events } from 'discord.js';

import { ExtendedClient } from '../structures/client';
import { logger } from '../utils/logger';

export default {
  name: Events.ClientReady,
  once: true,
  async execute(client: ExtendedClient) {
    if (!client.user) {
      logger.error('Client user is not available');
      return;
    }

    logger.success(`Bot is ready! Logged in as ${client.user.tag}`);
    logger.info(`Serving ${client.guilds.cache.size} guilds`);
    logger.info(`Total users: ${client.users.cache.size}`);

    // Set bot presence
    client.user.setPresence({
      activities: [
        {
          name: `${client.guilds.cache.size} servidores | /help`,
          type: 3, // Watching
        },
      ],
      status: 'online',
    });

    // Update guild count every 5 minutes
    setInterval(() => {
      if (client.user) {
        client.user.setActivity(`${client.guilds.cache.size} servidores | /help`, {
          type: 3,
        });
      }
    }, 5 * 60 * 1000);
  },
};