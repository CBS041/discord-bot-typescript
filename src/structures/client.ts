import {
  Client,
  ClientOptions,
  Collection,
  GatewayIntentBits,
  REST,
  Routes,
} from 'discord.js';
import { readdirSync } from 'fs';
import { join } from 'path';

import { Command } from './interfaces';
import { logger } from '../utils/logger';
import { GuildModel } from '../database/models/guild';
import { UserModel } from '../database/models/user';

export class ExtendedClient extends Client {
  public commands: Collection<string, Command> = new Collection();
  public aliases: Collection<string, string> = new Collection();
  public cooldowns: Collection<string, Collection<string, number>> = new Collection();

  public readonly guildDatabase = GuildModel;
  public readonly userDatabase = UserModel;
  public readonly owners: string[] = [process.env.OWNER_ID || '393490411932483592'];

  constructor(options: ClientOptions) {
    super({
      ...options,
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.MessageContent,
        ...(Array.isArray(options.intents) ? options.intents : []),
      ],
    });

    this.loadEvents();
    this.loadCommands();
  }

  public async deployCommands(): Promise<void> {
    if (!this.application?.id || !process.env.TOKEN) {
      throw new Error('Application ID or token not found');
    }

    const rest = new REST().setToken(process.env.TOKEN);
    const commands = this.commands.map(command => command.data.toJSON());

    try {
      logger.info(`Started refreshing ${commands.length} application (/) commands.`);

      const data = await rest.put(Routes.applicationCommands(this.application.id), {
        body: commands,
      });

      logger.success(
        `Successfully reloaded ${Array.isArray(data) ? data.length : 0} application (/) commands.`
      );
    } catch (error) {
      logger.error('Failed to deploy commands:', error);
      throw error;
    }
  }

  private async loadEvents(): Promise<void> {
    try {
      const eventsPath = join(__dirname, '../events');
      const eventFiles = readdirSync(eventsPath).filter(file => 
        file.endsWith('.ts') || file.endsWith('.js')
      );

      for (const file of eventFiles) {
        const eventModule = await import(join(eventsPath, file));
        const event = eventModule.default || eventModule;

        if (!event.name || typeof event.execute !== 'function') {
          logger.warn(`Event file ${file} is missing name or execute function`);
          continue;
        }

        if (event.once) {
          this.once(event.name, (...args) => event.execute(...args, this));
        } else {
          this.on(event.name, (...args) => event.execute(...args, this));
        }

        logger.debug(`Loaded event: ${event.name}`);
      }

      logger.success('Events loaded successfully');
    } catch (error) {
      logger.error('Failed to load events:', error);
      throw error;
    }
  }

  private async loadCommands(): Promise<void> {
    try {
      const commandsPath = join(__dirname, '../commands');
      const categoryFolders = readdirSync(commandsPath, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name);

      for (const folder of categoryFolders) {
        const categoryPath = join(commandsPath, folder);
        const commandFiles = readdirSync(categoryPath).filter(file => 
          file.endsWith('.ts') || file.endsWith('.js')
        );

        for (const file of commandFiles) {
          const commandModule = await import(join(categoryPath, file));
          const command: Command = commandModule.default || commandModule;

          if (!command.name || !command.data || typeof command.execute !== 'function') {
            logger.warn(`Command file ${file} is missing required properties`);
            continue;
          }

          this.commands.set(command.name, command);

          // Set up aliases
          if (command.aliases) {
            for (const alias of command.aliases) {
              this.aliases.set(alias, command.name);
            }
          }

          // Initialize cooldown collection
          if (command.cooldown) {
            this.cooldowns.set(command.name, new Collection());
          }

          logger.debug(`Loaded command: ${command.name}`);
        }
      }

      logger.success('Commands loaded successfully');
    } catch (error) {
      logger.error('Failed to load commands:', error);
      throw error;
    }
  }

  public override async login(token?: string): Promise<string> {
    const result = await super.login(token);
    
    // Deploy commands after successful login
    this.once('ready', async () => {
      try {
        await this.deployCommands();
      } catch (error) {
        logger.error('Failed to deploy commands on ready:', error);
      }
    });

    return result;
  }
}