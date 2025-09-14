import { ChatInputCommandInteraction, Message, PermissionResolvable, SlashCommandBuilder, SlashCommandOptionsOnlyBuilder } from 'discord.js';
import { ExtendedClient } from './client';
export interface CommandOptions {
    name: string;
    description: string;
    category: string;
    aliases?: string[];
    permissions?: PermissionResolvable[];
    cooldown?: number;
    ownerOnly?: boolean;
    guildOnly?: boolean;
    nsfw?: boolean;
}
export interface Command extends CommandOptions {
    data: SlashCommandBuilder | SlashCommandOptionsOnlyBuilder;
    execute: (interaction: ChatInputCommandInteraction, client: ExtendedClient) => Promise<void>;
    run?: (client: ExtendedClient, message: Message, args: string[]) => Promise<void>;
}
