// src/infrastructure/middlewares/requestLogger.ts
import { Request, Response, NextFunction } from 'express';
import logger from '../../presentation/loggers/logger';

export function requestLoggerMiddleware(req: Request, res: Response, next: NextFunction) {
  const { method, url, params, query, body } = req;

  res.on('finish', () => {
    logger.info({
      method,
      url,
      params,
      query,
      body,
      statusCode: res.statusCode
    });
  });

  next();
}
