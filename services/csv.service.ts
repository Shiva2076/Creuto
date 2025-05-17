import { IBookInput } from '../interfaces/book.interface';
import { addBook } from './books.service';

interface CSVImportResult {
  successCount: number;
  errors: Array<{
    row: number;
    message: string;
  }>;
}

export const importBooksFromCSV = (csvData: string): CSVImportResult => {
  const result: CSVImportResult = {
    successCount: 0,
    errors: []
  };

  const lines = csvData.split('\n');
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    
    const [title, author, publishedYearStr] = line.split(',');
    
    const validationError = validateBookRow(title, author, publishedYearStr, i + 1);
    if (validationError) {
      result.errors.push(validationError);
      continue;
    }
    
    try {
      addBook({
        title: title.trim(),
        author: author.trim(),
        publishedYear: parseInt(publishedYearStr.trim(), 10)
      });
      result.successCount++;
    } catch (error) {
      result.errors.push({
        row: i + 1,
        message: `Failed to add book: ${error instanceof Error ? error.message : 'Unknown error'}`
      });
    }
  }
  
  return result;
};

function validateBookRow(title: string | undefined, author: string | undefined, publishedYearStr: string | undefined, row: number): { row: number; message: string } | null {
  if (!title || !author || !publishedYearStr) {
    return {
      row,
      message: 'Missing required fields. Each row must have title, author, and publishedYear.'
    };
  }
  
  const publishedYear = parseInt(publishedYearStr.trim(), 10);
  if (isNaN(publishedYear)) {
    return {
      row,
      message: 'publishedYear must be a valid number.'
    };
  }
  
  if (publishedYear < 0 || publishedYear > new Date().getFullYear()) {
    return {
      row,
      message: `publishedYear must be between 0 and ${new Date().getFullYear()}.`
    };
  }
  
  return null;
}