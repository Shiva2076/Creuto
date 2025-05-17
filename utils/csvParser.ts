import { Request, Response } from 'express';
import { Book } from '../models/book.model';
import { parse } from 'csv-parse';

const parseCSVAndValidate = async (req: Request, res: Response) => {
    const fileBuffer = req.file?.buffer.toString('utf-8');
    if (!fileBuffer) return res.status(400).send('No file uploaded.');

    const records: Book[] = [];
    const errors: string[] = [];

    parse(fileBuffer, { columns: true }, (err, rows) => {
        if (err) return res.status(500).send('Error parsing CSV.');

        for (const row of rows) {
            const { title, author, publishedYear } = row;
            if (!title || !author || !publishedYear) {
                errors.push(`Missing data in row: ${JSON.stringify(row)}`);
                continue;
            }

            if (isNaN(Number(publishedYear))) {
                errors.push(`Invalid published year in row: ${JSON.stringify(row)}`);
                continue;
            }

            records.push({ id: '', title, author, publishedYear: Number(publishedYear) });
        }

        const addedBooksCount = records.length;

        records.forEach(book => {
            delete book.id; 
        });

        res.status(201).json({
            added: addedBooksCount,
            errors,
        });
    });
};

export { parseCSVAndValidate };