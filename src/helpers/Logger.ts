export class Logger {
  private static getTimestamp(): string {
    return new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
  }

  static info(message: string, ...args: unknown[]): void {
    console.log(`\x1b[36m[${this.getTimestamp()}] [INFO]\x1b[0m ${message}`, ...args);
  }

  static success(message: string, ...args: unknown[]): void {
    console.log(`\x1b[32m[${this.getTimestamp()}] [SUCCESS]\x1b[0m ${message}`, ...args);
  }

  static warn(message: string, ...args: unknown[]): void {
    console.warn(`\x1b[33m[${this.getTimestamp()}] [WARN]\x1b[0m ${message}`, ...args);
  }

  static error(message: string, ...args: unknown[]): void {
    console.error(`\x1b[31m[${this.getTimestamp()}] [ERROR]\x1b[0m ${message}`, ...args);
  }

  static debug(message: string, ...args: unknown[]): void {
    if (process.env.NODE_ENV === 'development') {
      console.log(`\x1b[35m[${this.getTimestamp()}] [DEBUG]\x1b[0m ${message}`, ...args);
    }
  }
}
