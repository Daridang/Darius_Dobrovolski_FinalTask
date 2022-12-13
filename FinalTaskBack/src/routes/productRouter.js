import express from 'express'
import { products, create, getOne, remove, update } from '../controller/productController.js';
import { auth } from '../middleware/auth.js';

export const productRouter = express.Router();

productRouter.get('/', products);
productRouter.get('/:id', getOne);
productRouter.post('/', auth, create);
productRouter.patch('/:id', auth, update);
productRouter.delete('/:id', auth, remove);