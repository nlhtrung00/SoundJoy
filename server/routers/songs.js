import express from 'express';
import { getSongs, postSong, updateSong, deleteSong } from '../controllers/songs.js';

const router = express.Router();

router.get('/', getSongs);
router.post('/', postSong);
router.put('/:id', updateSong);
router.delete('/:id', deleteSong);

export default router;