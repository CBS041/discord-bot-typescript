import { Events, ChatInputCommandInteraction } from 'discord.js';
import { ExtendedClient } from '../structures/client';
declare const _default: {
    name: Events;
    execute(interaction: ChatInputCommandInteraction, client: ExtendedClient): Promise<void>;
};
export default _default;
