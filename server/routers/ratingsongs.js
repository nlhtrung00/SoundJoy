import express from 'express';
<<<<<<< HEAD
import { deleteRatingSong,getRatingsBySong,getRatingsBySongOfUser, getRatingSong, getRatingSongs, postRatingSong, updateRatingSong,deleteRatingSongBySong } from '../controllers/rantingsongs.js';
=======
import { deleteRatingSong,getRatingsBySong,getRatingsBySongOfUser, getRatingSong, getRatingSongs, postRatingSong, updateRatingSong } from '../controllers/ratingsongs.js';
>>>>>>> 6f09a34e00cd2837b099c41df9e2c38479552daa

const router = express.Router();

router.get('/', getRatingSongs);
router.get('/song/:id',getRatingsBySong);
router.get('/userwithsong/:userId/:songId',getRatingsBySongOfUser);
router.get('/:id', getRatingSong);
router.post('/', postRatingSong);
router.put('/:id', updateRatingSong);
router.delete('/deletebysong/:songId', deleteRatingSongBySong);
router.delete('/:id', deleteRatingSong);

export default router;