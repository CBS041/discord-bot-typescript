import chalk from 'chalk';

export interface Logger {
  info: (message: string, ...args: unknown[]) => void;
  success: (message: string, ...args: unknown[]) => void;
  warn: (message: string, ...args: unknown[]) => void;
  error: (message: string, ...args: unknown[]) => void;
  debug: (message: string, ...args: unknown[]) => void;
}

class ConsoleLogger implements Logger {
  private getTimestamp(): string {
    return new Date().toISOString();
  }

  private formatMessage(level: string, message: string, ...args: unknown[]): string {
    const timestamp = this.getTimestamp();
    const formattedArgs = args.length > 0 ? ` ${args.join(' ')}` : '';
    return `[${timestamp}] [${level}] ${message}${formattedArgs}`;
  }

  info(message: string, ...args: unknown[]): void {
    console.log(chalk.blue(this.formatMessage('INFO', message, ...args)));
  }

  success(message: string, ...args: unknown[]): void {
    console.log(chalk.green(this.formatMessage('SUCCESS', message, ...args)));
  }

  warn(message: string, ...args: unknown[]): void {
    console.log(chalk.yellow(this.formatMessage('WARN', message, ...args)));
  }

  error(message: string, ...args: unknown[]): void {
    console.error(chalk.red(this.formatMessage('ERROR', message, ...args)));
  }

  debug(message: string, ...args: unknown[]): void {
    if (process.env.NODE_ENV === 'development') {
      console.log(chalk.gray(this.formatMessage('DEBUG', message, ...args)));
    }
  }
}

export const logger: Logger = new ConsoleLogger();