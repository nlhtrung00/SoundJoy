import express from 'express';
import multer from 'multer';
import { getSongs, postSong, updateSong, deleteSong, getSong, getSongByGenre, getSongByAlbum, getSongByMusician, getSongBySinger, getRecentSongs, getTopSongs, getBadSongs } from '../controllers/songs.js';

const storage = multer.diskStorage({
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname)
    }
});

const upload = multer({ storage: storage});

const multipleUpload = upload.fields([{'name': 'image'}, {'name': 'mp3'}]);

const router = express.Router();

router.get('/', getSongs);
router.get('/top', getTopSongs);
router.get('/bad', getBadSongs);
router.get('/:id', getSong);
router.post('/', multipleUpload, postSong);
router.put('/:id', updateSong);
router.delete('/:id', deleteSong);
router.get('/genre/:id', getSongByGenre);
router.get('/album/:id', getSongByAlbum);
router.get('/musician/:id', getSongByMusician);
router.get('/singer/:id', getSongBySinger);
router.get('/recent/recent', getRecentSongs);

export default router;