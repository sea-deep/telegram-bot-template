export class Logger {
    static getTimestamp() {
        return new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
    }
    static info(message, ...args) {
        console.log(`\x1b[36m[${this.getTimestamp()}] [INFO]\x1b[0m ${message}`, ...args);
    }
    static success(message, ...args) {
        console.log(`\x1b[32m[${this.getTimestamp()}] [SUCCESS]\x1b[0m ${message}`, ...args);
    }
    static warn(message, ...args) {
        console.warn(`\x1b[33m[${this.getTimestamp()}] [WARN]\x1b[0m ${message}`, ...args);
    }
    static error(message, ...args) {
        console.error(`\x1b[31m[${this.getTimestamp()}] [ERROR]\x1b[0m ${message}`, ...args);
    }
    static debug(message, ...args) {
        if (process.env.NODE_ENV === 'development') {
            console.log(`\x1b[35m[${this.getTimestamp()}] [DEBUG]\x1b[0m ${message}`, ...args);
        }
    }
}
