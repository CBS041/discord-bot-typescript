"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExtendedClient = void 0;
const discord_js_1 = require("discord.js");
const fs_1 = require("fs");
const path_1 = require("path");
const logger_1 = require("../utils/logger");
const guild_1 = require("../database/models/guild");
const user_1 = require("../database/models/user");
class ExtendedClient extends discord_js_1.Client {
    commands = new discord_js_1.Collection();
    aliases = new discord_js_1.Collection();
    cooldowns = new discord_js_1.Collection();
    guildDatabase = guild_1.GuildModel;
    userDatabase = user_1.UserModel;
    owners = [process.env.OWNER_ID || '393490411932483592'];
    constructor(options) {
        super({
            ...options,
            intents: [
                discord_js_1.GatewayIntentBits.Guilds,
                discord_js_1.GatewayIntentBits.GuildMessages,
                discord_js_1.GatewayIntentBits.GuildMembers,
                discord_js_1.GatewayIntentBits.MessageContent,
                ...(Array.isArray(options.intents) ? options.intents : []),
            ],
        });
        this.loadEvents();
        this.loadCommands();
    }
    async deployCommands() {
        if (!this.application?.id || !process.env.TOKEN) {
            throw new Error('Application ID or token not found');
        }
        const rest = new discord_js_1.REST().setToken(process.env.TOKEN);
        const commands = this.commands.map(command => command.data.toJSON());
        try {
            logger_1.logger.info(`Started refreshing ${commands.length} application (/) commands.`);
            const data = await rest.put(discord_js_1.Routes.applicationCommands(this.application.id), {
                body: commands,
            });
            logger_1.logger.success(`Successfully reloaded ${Array.isArray(data) ? data.length : 0} application (/) commands.`);
        }
        catch (error) {
            logger_1.logger.error('Failed to deploy commands:', error);
            throw error;
        }
    }
    async loadEvents() {
        try {
            const eventsPath = (0, path_1.join)(__dirname, '../events');
            const eventFiles = (0, fs_1.readdirSync)(eventsPath).filter(file => file.endsWith('.ts') || file.endsWith('.js'));
            for (const file of eventFiles) {
                const eventModule = await Promise.resolve(`${(0, path_1.join)(eventsPath, file)}`).then(s => __importStar(require(s)));
                const event = eventModule.default || eventModule;
                if (!event.name || typeof event.execute !== 'function') {
                    logger_1.logger.warn(`Event file ${file} is missing name or execute function`);
                    continue;
                }
                if (event.once) {
                    this.once(event.name, (...args) => event.execute(...args, this));
                }
                else {
                    this.on(event.name, (...args) => event.execute(...args, this));
                }
                logger_1.logger.debug(`Loaded event: ${event.name}`);
            }
            logger_1.logger.success('Events loaded successfully');
        }
        catch (error) {
            logger_1.logger.error('Failed to load events:', error);
            throw error;
        }
    }
    async loadCommands() {
        try {
            const commandsPath = (0, path_1.join)(__dirname, '../commands');
            const categoryFolders = (0, fs_1.readdirSync)(commandsPath, { withFileTypes: true })
                .filter(dirent => dirent.isDirectory())
                .map(dirent => dirent.name);
            for (const folder of categoryFolders) {
                const categoryPath = (0, path_1.join)(commandsPath, folder);
                const commandFiles = (0, fs_1.readdirSync)(categoryPath).filter(file => file.endsWith('.ts') || file.endsWith('.js'));
                for (const file of commandFiles) {
                    const commandModule = await Promise.resolve(`${(0, path_1.join)(categoryPath, file)}`).then(s => __importStar(require(s)));
                    const command = commandModule.default || commandModule;
                    if (!command.name || !command.data || typeof command.execute !== 'function') {
                        logger_1.logger.warn(`Command file ${file} is missing required properties`);
                        continue;
                    }
                    this.commands.set(command.name, command);
                    if (command.aliases) {
                        for (const alias of command.aliases) {
                            this.aliases.set(alias, command.name);
                        }
                    }
                    if (command.cooldown) {
                        this.cooldowns.set(command.name, new discord_js_1.Collection());
                    }
                    logger_1.logger.debug(`Loaded command: ${command.name}`);
                }
            }
            logger_1.logger.success('Commands loaded successfully');
        }
        catch (error) {
            logger_1.logger.error('Failed to load commands:', error);
            throw error;
        }
    }
    async login(token) {
        const result = await super.login(token);
        this.once('ready', async () => {
            try {
                await this.deployCommands();
            }
            catch (error) {
                logger_1.logger.error('Failed to deploy commands on ready:', error);
            }
        });
        return result;
    }
}
exports.ExtendedClient = ExtendedClient;
//# sourceMappingURL=client.js.map