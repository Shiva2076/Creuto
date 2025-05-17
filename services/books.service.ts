import {
  getAllBooks as getAllBooksModel,
  getBookById as getBookByIdModel,
  createBook as createBookModel,
  updateBook as updateBookModel,
  deleteBook as deleteBookModel
} from '../models/book.model';
import { IBook, IBookInput } from '../interfaces/book.interface';

export const getAllBooks = (): IBook[] => {
  return getAllBooksModel();
};

export const getBook = (id: string): IBook | undefined => {
  return getBookByIdModel(id);
};

export const addBook = (bookData: IBookInput): IBook => {
  return createBookModel(bookData);
};

export const modifyBook = (id: string, bookData: IBookInput): IBook | undefined => {
  return updateBookModel(id, bookData);
};

export const removeBook = (id: string): boolean => {
  return deleteBookModel(id);
};