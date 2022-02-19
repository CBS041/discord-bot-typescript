import {
    Schema,
    model
} from 'mongoose';

const GuildSchema = new Schema({
    idG: { type: String, required: true },
    prefix: { type: String, default: process.env.PREFIX }
});

export = model('guilds', GuildSchema);