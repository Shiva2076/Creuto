import { Router } from 'express';
import multer from 'multer';
import {
  getBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook,
  importBooks
} from '../controllers/books.controller';
import  {validateBookInput}  from '../middlewares/validation.middleware';

const upload = multer();
const router = Router();

router.get('/', getBooks);
router.get('/:id', getBook);
router.post('/', validateBookInput, createBook);
router.put('/:id', validateBookInput, updateBook);
router.delete('/:id', deleteBook);
router.post('/import', upload.single('csv'), importBooks);

export default router;