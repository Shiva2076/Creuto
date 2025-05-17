import { BookInput } from '../interfaces/book.interface';

export function validateBookInput(book: BookInput): void {
  if (!book.title || book.title.trim() === '') {
    throw new Error('Title is required');
  }

  if (!book.author || book.author.trim() === '') {
    throw new Error('Author is required');
  }

  if (!book.publishedYear || isNaN(book.publishedYear)) {
    throw new Error('Published year must be a valid number');
  }

  if (book.publishedYear < 0 || book.publishedYear > new Date().getFullYear() + 1) {
    throw new Error('Published year must be a reasonable value');
  }
}

export function validateCSVRow(row: string): void {
  const columns = row.split(',');
  if (columns.length !== 3) {
    throw new Error('Each row must contain exactly 3 columns: title, author, publishedYear');
  }
}