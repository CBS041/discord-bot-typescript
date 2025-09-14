"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const chalk_1 = __importDefault(require("chalk"));
class ConsoleLogger {
    getTimestamp() {
        return new Date().toISOString();
    }
    formatMessage(level, message, ...args) {
        const timestamp = this.getTimestamp();
        const formattedArgs = args.length > 0 ? ` ${args.join(' ')}` : '';
        return `[${timestamp}] [${level}] ${message}${formattedArgs}`;
    }
    info(message, ...args) {
        console.log(chalk_1.default.blue(this.formatMessage('INFO', message, ...args)));
    }
    success(message, ...args) {
        console.log(chalk_1.default.green(this.formatMessage('SUCCESS', message, ...args)));
    }
    warn(message, ...args) {
        console.log(chalk_1.default.yellow(this.formatMessage('WARN', message, ...args)));
    }
    error(message, ...args) {
        console.error(chalk_1.default.red(this.formatMessage('ERROR', message, ...args)));
    }
    debug(message, ...args) {
        if (process.env.NODE_ENV === 'development') {
            console.log(chalk_1.default.gray(this.formatMessage('DEBUG', message, ...args)));
        }
    }
}
exports.logger = new ConsoleLogger();
//# sourceMappingURL=logger.js.map