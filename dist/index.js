"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const connection_1 = require("./database/connection");
const client_1 = require("./structures/client");
async function main() {
    try {
        await (0, connection_1.connectDatabase)(process.env.DATABASE_URL);
        const client = new client_1.ExtendedClient({
            intents: ['Guilds', 'GuildMessages', 'GuildMembers', 'MessageContent'],
        });
        await client.login(process.env.TOKEN);
    }
    catch (error) {
        console.error('Failed to start bot:', error);
        process.exit(1);
    }
}
main();
//# sourceMappingURL=index.js.map