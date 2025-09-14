import { Events } from 'discord.js';
import { ExtendedClient } from '../structures/client';
declare const _default: {
    name: Events;
    once: boolean;
    execute(client: ExtendedClient): Promise<void>;
};
export default _default;
