import { Document } from 'mongoose';
export interface IUser extends Document {
    userId: string;
    username: string;
    discriminator: string;
    avatar?: string;
    language: string;
    premium: boolean;
    premiumExpiry?: Date;
    blacklisted: boolean;
    blacklistReason?: string;
    commands: number;
    experience: number;
    level: number;
    money: number;
    dailyStreak: number;
    lastDaily?: Date;
    createdAt: Date;
    updatedAt: Date;
}
export declare const UserModel: import("mongoose").Model<IUser, {}, {}, {}, Document<unknown, {}, IUser, {}, {}> & IUser & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
