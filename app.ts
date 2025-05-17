import express from 'express';
import morgan from 'morgan';
import { logger } from './utils/logger';
import booksRouter from './routes/books.route';
import { errorHandler, notFoundHandler } from './middlewares/error.middleware';

const app = express();

app.use(express.json());
app.use(morgan('combined', { stream: { write: (message) => logger.info(message.trim()) } }));

app.use('/books', booksRouter);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;