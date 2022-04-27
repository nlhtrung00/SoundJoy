import express from 'express';
import { deleteRatingMusician, getRatingMusician, getRatingMusicians, postRatingMusician, updateRatingMusician } from '../controllers/rantingmusicians.js';

const router = express.Router();

router.get('/', getRatingMusicians);
router.get('/:id', getRatingMusician);
router.post('/', postRatingMusician);
router.put('/:id', updateRatingMusician);
router.delete('/:id', deleteRatingMusician);

export default router;