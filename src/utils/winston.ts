import { LoggerService } from '@nestjs/common';
const { createLogger, format, transports } = require('winston');

const consoleOptions = new transports.Console({
  level: 'debug',
  handleExceptions: true,
  format: format.combine(
    format.colorize(),
    format.timestamp(),
    format.prettyPrint(),
    format.align(),
    format.splat(),
    format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`)
  )
});

const fileOptions = new transports.File({
  level: 'info',
  filename: `${process.env.LOG_FOLDER_PATH || '../logs'}/app.log`,
  handleExceptions: true,
  maxsize: 5242880, // 5MB
  maxFiles: 5,
  format: format.combine(
    format.label({ label: process.env.PROJECT_NAME }),
    format.timestamp(),
    format.splat(),
    format.prettyPrint(),
    format.json()
  )
});

const winstonLogger = createLogger({
  level: 'info',
  transports: [fileOptions, consoleOptions],
  exitOnError: false
});

// create a stream object with a 'write' function that will be used by `morgan`
const winstonStream = {
  write: function (message) {
    // use the 'info' log level so the output will be picked up by both transports (file and console)
    winstonLogger.info(message);
  }
};

export class WinstonLoggerService implements LoggerService {
  private context?: string = 'LoggerService';

  public log(message: any, context?: string): any {
    context = context || this.context;

    if ('object' === typeof message) {
      const { message: msg, ...meta } = message;

      return winstonLogger.info(msg as string, { context, ...meta });
    }
    return winstonLogger.info(`[${context}] ${message}`, { context });
  }

  public error(message: any, trace?: string, context?: string): any {
    context = context || this.context;

    if (message instanceof Error) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { message: msg, name, stack, ...meta } = message;

      return winstonLogger.error(msg, { context, stack: [trace || message.stack], ...meta });
    }

    if ('object' === typeof message) {
      const { message: msg, ...meta } = message;

      return winstonLogger.error(msg as string, { context, stack: [trace], ...meta });
    }

    return winstonLogger.error(`[${context}] ${message}`, { context, stack: [trace] });
  }

  public warn(message: any, context?: string): any {
    context = context || this.context;

    if ('object' === typeof message) {
      const { message: msg, ...meta } = message;

      return winstonLogger.warn(msg as string, { context, ...meta });
    }

    return winstonLogger.warn(`[${context}] ${message}`, { context });
  }

  public debug?(message: any, context?: string): any {
    context = context || this.context;

    if ('object' === typeof message) {
      const { message: msg, ...meta } = message;

      return winstonLogger.debug(msg as string, { context, ...meta });
    }

    return winstonLogger.debug(`[${context}] ${message}`, { context });
  }

  public verbose?(message: any, context?: string): any {
    context = context || this.context;

    if ('object' === typeof message) {
      const { message: msg, ...meta } = message;

      return winstonLogger.verbose(msg as string, { context, ...meta });
    }

    return winstonLogger.verbose(`[${context}] ${message}`, { context });
  }
}

export { winstonLogger, winstonStream };
