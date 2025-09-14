import { Client, ClientOptions, Collection } from 'discord.js';
import { Command } from './interfaces';
export declare class ExtendedClient extends Client {
    commands: Collection<string, Command>;
    aliases: Collection<string, string>;
    cooldowns: Collection<string, Collection<string, number>>;
    readonly guildDatabase: import("mongoose").Model<import("../database/models/guild").IGuild, {}, {}, {}, import("mongoose").Document<unknown, {}, import("../database/models/guild").IGuild, {}, {}> & import("../database/models/guild").IGuild & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }, any>;
    readonly userDatabase: import("mongoose").Model<import("../database/models/user").IUser, {}, {}, {}, import("mongoose").Document<unknown, {}, import("../database/models/user").IUser, {}, {}> & import("../database/models/user").IUser & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }, any>;
    readonly owners: string[];
    constructor(options: ClientOptions);
    deployCommands(): Promise<void>;
    private loadEvents;
    private loadCommands;
    login(token?: string): Promise<string>;
}
