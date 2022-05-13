import express from 'express';
import multer from 'multer';
import { getAlbums, postAlbum, updateAlbum,getNewestAlbum, deleteAlbum, getAlbum, getRecentAlbums, getTopAlbums, getAlbumsByGenre,getAlbumsByMusician,getAlbumsBySinger } from '../controllers/albums.js';

const storage = multer.diskStorage({
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname)
    }
});

const upload = multer({ storage: storage });

const router = express.Router();

router.get('/', getAlbums);
router.get('/singer/:singerId',getAlbumsBySinger);
router.get('/musician/:musicianId', getAlbumsByMusician);
router.get('/newest', getNewestAlbum);
router.get('/genre/:id', getAlbumsByGenre);
router.get('/recent/recent', getRecentAlbums);
router.get('/top', getTopAlbums);
router.get('/:id', getAlbum);
router.post('/', upload.single('image'), postAlbum);
router.put('/:id', upload.single('image'), updateAlbum);
router.delete('/:id', deleteAlbum);
export default router;