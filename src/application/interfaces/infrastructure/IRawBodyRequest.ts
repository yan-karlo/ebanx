import { Request } from 'express';

export interface IRawBodyRequest extends Request {
  rawBody: string;
} 
