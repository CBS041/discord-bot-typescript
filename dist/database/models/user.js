"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    userId: {
        type: String,
        required: true,
        unique: true,
        index: true,
    },
    username: {
        type: String,
        required: true,
    },
    discriminator: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        default: null,
    },
    language: {
        type: String,
        default: 'pt-BR',
        enum: ['pt-BR', 'en-US', 'es-ES'],
    },
    premium: {
        type: Boolean,
        default: false,
    },
    premiumExpiry: {
        type: Date,
        default: null,
    },
    blacklisted: {
        type: Boolean,
        default: false,
    },
    blacklistReason: {
        type: String,
        default: null,
        maxlength: 500,
    },
    commands: {
        type: Number,
        default: 0,
        min: 0,
    },
    experience: {
        type: Number,
        default: 0,
        min: 0,
    },
    level: {
        type: Number,
        default: 1,
        min: 1,
    },
    money: {
        type: Number,
        default: 100,
        min: 0,
    },
    dailyStreak: {
        type: Number,
        default: 0,
        min: 0,
    },
    lastDaily: {
        type: Date,
        default: null,
    },
}, {
    timestamps: true,
    versionKey: false,
});
userSchema.methods.calculateLevel = function () {
    return Math.floor(0.1 * Math.sqrt(this.experience)) + 1;
};
userSchema.methods.canClaimDaily = function () {
    if (!this.lastDaily)
        return true;
    const now = new Date();
    const lastDaily = new Date(this.lastDaily);
    const diffHours = Math.abs(now.getTime() - lastDaily.getTime()) / 36e5;
    return diffHours >= 24;
};
exports.UserModel = (0, mongoose_1.model)('User', userSchema);
//# sourceMappingURL=user.js.map