import express from 'express';
import { getFavorites, postFavorite, updateFavorite, deleteFavorite } from '../controllers/favorites.js';

const router = express.Router();

router.get('/', getFavorites);
router.post('/', postFavorite);
router.put('/:id', updateFavorite);
router.delete('/:id', deleteFavorite);

export default router;