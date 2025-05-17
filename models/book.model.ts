import { IBook, IBookInput } from '../interfaces/book.interface';

let books: IBook[] = [];

export const getAllBooks = (): IBook[] => {
  return books;
};

export const getBookById = (id: string): IBook | undefined => {
  return books.find(book => book.id === id);
};

export const createBook = (bookData: IBookInput): IBook => {
  const newBook: IBook = {
    id: generateUUID(),
    ...bookData
  };
  books.push(newBook);
  return newBook;
};

export const updateBook = (id: string, bookData: IBookInput): IBook | undefined => {
  const index = books.findIndex(book => book.id === id);
  if (index !== -1) {
    books[index] = { ...books[index], ...bookData };
    return books[index];
  }
  return undefined;
};

export const deleteBook = (id: string): boolean => {
  const initialLength = books.length;
  books = books.filter(book => book.id !== id);
  return books.length !== initialLength;
};

function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}