// src/infrastructure/middlewares/ResponseBodyMiddleware.ts
import { Request, Response, NextFunction } from 'express';

/**
 * Middleware to capture response body by wrapping res.send.
 * Saves the body on res.body for logger access.
 * Should be placed BEFORE routes and after RequestBodyMiddleware.
 */

export function responseBodyMiddleware(req: Request, res: Response, next: NextFunction) {
  const originalSend = res.send;
  res.send = function (body) {
    (res as any).body = body;
    return originalSend.call(this, body);
  };
  next();
}
