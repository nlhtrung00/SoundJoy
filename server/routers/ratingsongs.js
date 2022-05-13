import express from 'express';
import { deleteRatingSong,getRatingsBySong,getRatingsBySongOfUser, getRatingSong, getRatingSongs, postRatingSong, updateRatingSong } from '../controllers/rantingsongs.js';

const router = express.Router();

router.get('/', getRatingSongs);
router.get('/song/:id',getRatingsBySong);
router.get('/userwithsong/:userId/:songId',getRatingsBySongOfUser);
router.get('/:id', getRatingSong);
router.post('/', postRatingSong);
router.put('/:id', updateRatingSong);
router.delete('/:id', deleteRatingSong);

export default router;