import express from 'express';
import { deleteRatingGenre, getRatingGenre, getRatingGenres, postRatingGenre, updateRatingGenre } from '../controllers/rantinggenres.js';

const router = express.Router();

router.get('/', getRatingGenres);
router.get('/:id', getRatingGenre);
router.post('/', postRatingGenre);
router.put('/:id', updateRatingGenre);
router.delete('/:id', deleteRatingGenre);

export default router;