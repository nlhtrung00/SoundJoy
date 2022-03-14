import express from 'express';
import { getLikelists, postLikelist, updateLikelist, deleteLikelist, getLikelist } from '../controllers/likelists.js';

const router = express.Router();

router.get('/', getLikelists);
router.get('/:id', getLikelist);
router.post('/', postLikelist);
router.put('/:id', updateLikelist);
router.delete('/:id', deleteLikelist);

export default router;