import express from 'express';
import { deleteRatingSinger, getRatingSinger, getRatingSingers, postRatingSinger, updateRatingSinger } from '../controllers/rantingsingers.js';

const router = express.Router();

router.get('/', getRatingSingers);
router.get('/:id', getRatingSinger);
router.post('/', postRatingSinger);
router.put('/:id', updateRatingSinger);
router.delete('/:id', deleteRatingSinger);

export default router;