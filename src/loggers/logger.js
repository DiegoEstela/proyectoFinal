const path = require("path");
const winston = require("winston");

const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({
      filename: path.join(__dirname, "../logs/error.log"),
      level: "error",
    }),
    new winston.transports.File({
      filename: path.join(__dirname, "../logs/warn.log"),
      level: "warn",
    }),
    new winston.transports.File({
      filename: path.join(__dirname, "../logs/info.log"),
      level: "info",
    }),
  ],
});

module.exports = logger;
