import express from 'express';
import { getSingers, postSinger, updateSinger, deleteSinger, getSinger } from '../controllers/singers.js';

const router = express.Router();

router.get('/', getSingers);
router.get('/:id', getSinger);
router.post('/', postSinger);
router.put('/:id', updateSinger);
router.delete('/:id', deleteSinger);

export default router;
