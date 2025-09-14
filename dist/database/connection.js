"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDatabase = connectDatabase;
exports.disconnectDatabase = disconnectDatabase;
const mongoose_1 = __importDefault(require("mongoose"));
const logger_1 = require("../utils/logger");
async function connectDatabase(url) {
    if (!url) {
        throw new Error('Database URL is required');
    }
    try {
        await mongoose_1.default.connect(url, {
            bufferCommands: false,
        });
        logger_1.logger.success('Database connected successfully');
        mongoose_1.default.connection.on('error', (error) => {
            logger_1.logger.error('Database connection error:', error);
        });
        mongoose_1.default.connection.on('disconnected', () => {
            logger_1.logger.warn('Database disconnected');
        });
    }
    catch (error) {
        logger_1.logger.error('Failed to connect to database:', error);
        throw error;
    }
}
async function disconnectDatabase() {
    try {
        await mongoose_1.default.disconnect();
        logger_1.logger.info('Database disconnected');
    }
    catch (error) {
        logger_1.logger.error('Error disconnecting from database:', error);
        throw error;
    }
}
//# sourceMappingURL=connection.js.map