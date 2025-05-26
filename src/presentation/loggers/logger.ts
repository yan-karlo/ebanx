// src/presentation/loggers/logger.ts
import fs from 'fs';
import path from 'path';
import pino from 'pino';

const logDir = path.resolve(__dirname, '../../../logs');
if (!fs.existsSync(logDir)) fs.mkdirSync(logDir, { recursive: true });

const logFilePath = path.join(logDir, 'api-log.json');
const logger = pino(
  { level: 'info', timestamp: pino.stdTimeFunctions.isoTime },
  pino.destination({ dest: logFilePath, append: true })
);

export default logger;
