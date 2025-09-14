"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GuildModel = void 0;
const mongoose_1 = require("mongoose");
const guildSchema = new mongoose_1.Schema({
    guildId: {
        type: String,
        required: true,
        unique: true,
        index: true,
    },
    name: {
        type: String,
        required: true,
    },
    prefix: {
        type: String,
        default: '!',
        maxlength: 5,
    },
    language: {
        type: String,
        default: 'pt-BR',
        enum: ['pt-BR', 'en-US', 'es-ES'],
    },
    muteRole: {
        type: String,
        default: null,
    },
    modLogChannel: {
        type: String,
        default: null,
    },
    autoRole: {
        type: String,
        default: null,
    },
    welcomeChannel: {
        type: String,
        default: null,
    },
    leaveChannel: {
        type: String,
        default: null,
    },
    welcomeMessage: {
        type: String,
        default: 'Bem-vindo(a) {user} ao servidor {server}!',
        maxlength: 2000,
    },
    leaveMessage: {
        type: String,
        default: '{user} saiu do servidor {server}.',
        maxlength: 2000,
    },
    antiSpam: {
        type: Boolean,
        default: false,
    },
    antiLink: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
    versionKey: false,
});
exports.GuildModel = (0, mongoose_1.model)('Guild', guildSchema);
//# sourceMappingURL=guild.js.map