import express from 'express';
import { deleteCategory, getCategories, postCategory, updateCategory } from '../controllers/categories.js';

const router = express.Router();

router.get('/', getCategories);
router.post('/', postCategory);
router.put('/:id', updateCategory);
router.delete('/:id', deleteCategory);


export default router;