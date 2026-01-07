import fs from "fs";
import path from "path";
import winston from "winston";

// Ensure logs directory exists
const logDir = path.join(process.cwd(), "logs");
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    winston.format.printf(
      ({ level, message, timestamp }) =>
        `${timestamp} [${level.toUpperCase()}]: ${message}`
    )
  ),
  transports: [
    // Error logs
    new winston.transports.File({
      filename: path.join(logDir, "error.log"),
      level: "error",
    }),

    // API & normal logs
    new winston.transports.File({
      filename: path.join(logDir, "api.log"),
    }),

    // Console logs (very important for Docker)
    new winston.transports.Console(),
  ],
});

export default logger;
