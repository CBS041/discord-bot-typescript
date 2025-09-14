import { ChatInputCommandInteraction } from 'discord.js';
import { ExtendedClient } from '../../structures/client';
declare const _default: {
    name: string;
    description: string;
    category: string;
    aliases: string[];
    cooldown: number;
    data: import("discord.js").SlashCommandOptionsOnlyBuilder;
    execute(interaction: ChatInputCommandInteraction, client: ExtendedClient): Promise<void>;
};
export default _default;
