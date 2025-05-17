import { Request, Response, NextFunction } from 'express';
import { IBookInput } from '../interfaces/book.interface';

export const validateBookInput = (req: Request, res: Response, next: NextFunction): void => {
  const { title, author, publishedYear } = req.body as IBookInput;
  
  if (!title || !author || !publishedYear) {
    res.status(400).json({ message: 'Missing required fields: title, author, publishedYear' });
    return;
  }
  
  if (typeof publishedYear !== 'number' || publishedYear < 0 || publishedYear > new Date().getFullYear()) {
    res.status(400).json({ 
      message: `publishedYear must be a valid number between 0 and ${new Date().getFullYear()}`
    });
    return;
  }
  
  next();
};