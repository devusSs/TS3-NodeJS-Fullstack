import fs from "fs";
import winston from "winston";
import "winston-daily-rotate-file";

let logsDir: string = "./logs";

const createLogsDirectory = (): void => {
  if (!fs.existsSync(logsDir)) {
    try {
      fs.mkdirSync(logsDir);
      console.log(`Successfully created logs directory: ${logsDir}`);
      logger.info(`Successfully created logs directory: ${logsDir}`);
    } catch (err: any) {
      throw new Error(err);
    }
  }
};

let appLogTransport = new winston.transports.DailyRotateFile({
  filename: `${logsDir}/app_%DATE%.log`,
  datePattern: "YYYY-MM-DD-HH",
  zippedArchive: true,
  maxSize: "20m",
  maxFiles: "14d",
});

let errLogTransport = new winston.transports.DailyRotateFile({
  level: "error",
  filename: `${logsDir}/error_%DATE%.log`,
  datePattern: "YYYY-MM-DD-HH",
  zippedArchive: true,
  maxSize: "20m",
  maxFiles: "14d",
});

let logger = winston.createLogger({
  level: "info",
  transports: [appLogTransport, errLogTransport],
});

export default { createLogsDirectory, logger };
