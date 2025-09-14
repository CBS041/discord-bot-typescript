"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const logger_1 = require("../utils/logger");
exports.default = {
    name: discord_js_1.Events.ClientReady,
    once: true,
    async execute(client) {
        if (!client.user) {
            logger_1.logger.error('Client user is not available');
            return;
        }
        logger_1.logger.success(`Bot is ready! Logged in as ${client.user.tag}`);
        logger_1.logger.info(`Serving ${client.guilds.cache.size} guilds`);
        logger_1.logger.info(`Total users: ${client.users.cache.size}`);
        client.user.setPresence({
            activities: [
                {
                    name: `${client.guilds.cache.size} servidores | /help`,
                    type: 3,
                },
            ],
            status: 'online',
        });
        setInterval(() => {
            if (client.user) {
                client.user.setActivity(`${client.guilds.cache.size} servidores | /help`, {
                    type: 3,
                });
            }
        }, 5 * 60 * 1000);
    },
};
//# sourceMappingURL=ready.js.map