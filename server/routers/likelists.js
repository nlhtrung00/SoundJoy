import express from 'express';
import { getLikelists, postLikelist, updateLikelist, deleteLikelist } from '../controllers/likelists.js';

const router = express.Router();

router.get('/', getLikelists);
router.post('/', postLikelist);
router.put('/:id', updateLikelist);
router.delete('/:id', deleteLikelist);

export default router;