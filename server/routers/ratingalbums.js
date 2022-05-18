import express from 'express';
import { deleteRatingAlbum, getRatingsByAlbumOfUser,getRatingsByAlbum,getRatingAlbum, getRatingAlbums, postRatingAlbum, updateRatingAlbum } from '../controllers/ratingalbums.js';

const router = express.Router();

router.get('/', getRatingAlbums);
router.get('/album/:id',getRatingsByAlbum);
router.get('/userwithalbum/:userId/:albumId',getRatingsByAlbumOfUser);
router.get('/:id', getRatingAlbum);
router.post('/', postRatingAlbum);
router.put('/:id', updateRatingAlbum);
router.delete('/:id', deleteRatingAlbum);

export default router;