import express from 'express';
import { getSongs, postSong, updateSong, deleteSong, getSong, getSongByGenre, getSongByAlbum, getSongByMusician, getSongBySinger } from '../controllers/songs.js';

const router = express.Router();

router.get('/', getSongs);
router.get('/:id', getSong);
router.post('/', postSong);
router.put('/:id', updateSong);
router.delete('/:id', deleteSong);
router.get('/genre/:id', getSongByGenre);
router.get('/album/:id', getSongByAlbum);
router.get('/musician/:id', getSongByMusician);
router.get('/singer/:id', getSongBySinger);


export default router;