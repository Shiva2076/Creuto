import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction): void => {
  logger.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
};

export const notFoundHandler = (req: Request, res: Response, next: NextFunction): void => {
  res.status(404).json({ message: 'Route not found' });
};