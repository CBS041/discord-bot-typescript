import { Document } from 'mongoose';
export interface IGuild extends Document {
    guildId: string;
    name: string;
    prefix: string;
    language: string;
    muteRole?: string;
    modLogChannel?: string;
    autoRole?: string;
    welcomeChannel?: string;
    leaveChannel?: string;
    welcomeMessage?: string;
    leaveMessage?: string;
    antiSpam: boolean;
    antiLink: boolean;
    createdAt: Date;
    updatedAt: Date;
}
export declare const GuildModel: import("mongoose").Model<IGuild, {}, {}, {}, Document<unknown, {}, IGuild, {}, {}> & IGuild & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
