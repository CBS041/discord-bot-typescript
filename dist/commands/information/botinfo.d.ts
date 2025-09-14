import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';
import 'moment-duration-format';
import { ExtendedClient } from '../../structures/client';
declare const _default: {
    name: string;
    description: string;
    category: string;
    aliases: string[];
    cooldown: number;
    data: SlashCommandBuilder;
    execute(interaction: ChatInputCommandInteraction, client: ExtendedClient): Promise<void>;
};
export default _default;
