import { Request, Response, NextFunction } from 'express';
import { IBookInput } from '../interfaces/book.interface';
import * as bookService from '../services/books.service';
import * as csvService from '../services/csv.service';

export const getBooks = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const books = bookService.getAllBooks();
    res.status(200).json(books);
  } catch (error) {
    next(error);
  }
};

export const getBook = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const book = bookService.getBook(req.params.id);
    if (book) {
      res.status(200).json(book);
    } else {
      res.status(404).json({ message: 'Book not found' });
    }
  } catch (error) {
    next(error);
  }
};

export const createBook = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const bookData: IBookInput = req.body;
    const newBook = bookService.addBook(bookData);
    res.status(201).json(newBook);
  } catch (error) {
    next(error);
  }
};

export const updateBook = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const bookData: IBookInput = req.body;
    const updatedBook = bookService.modifyBook(req.params.id, bookData);
    if (updatedBook) {
      res.status(200).json(updatedBook);
    } else {
      res.status(404).json({ message: 'Book not found' });
    }
  } catch (error) {
    next(error);
  }
};

export const deleteBook = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const success = bookService.removeBook(req.params.id);
    if (success) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Book not found' });
    }
  } catch (error) {
    next(error);
  }
};

export const importBooks = (req: Request, res: Response, next: NextFunction): void => {
  try {
    if (!req.file) {
      res.status(400).json({ message: 'No file uploaded' });
      return;
    }
    
    const csvData = req.file.buffer.toString();
    const result = csvService.importBooksFromCSV(csvData);
    
    res.status(200).json({
      message: 'CSV import completed',
      ...result
    });
  } catch (error) {
    next(error);
  }
};