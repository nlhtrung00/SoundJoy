import express from 'express';
import { deleteListen, getListens, postListen, updateListen } from '../controllers/listens.js';

const router = express.Router();

router.get('/', getListens);
router.post('/', postListen);
router.put('/:id', updateListen);
router.delete('/:id', deleteListen);

export default router;