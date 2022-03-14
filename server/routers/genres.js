import express from 'express';
import { getGenres, postGenre, updateGenre, deleteGenre, getGenre } from '../controllers/genres.js';

const router = express.Router();

router.get('/', getGenres);
router.get('/:id', getGenre);
router.post('/', postGenre);
router.put('/:id', updateGenre);
router.delete('/:id', deleteGenre);


export default router;