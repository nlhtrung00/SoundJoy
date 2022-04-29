import express from 'express';
import multer from 'multer';
import { getAlbums, postAlbum, updateAlbum, deleteAlbum, getAlbum, getRecentAlbums, getTopAlbums } from '../controllers/albums.js';

const storage = multer.diskStorage({
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname)
    }
});

const upload = multer({ storage: storage });

const router = express.Router();

router.get('/', getAlbums);
<<<<<<< HEAD
router.get('/recent/recent', getRecentAlbums);
=======
>>>>>>> 0acce17aa23d4240c6398a7af0c66bdfa25be3ca
router.get('/top', getTopAlbums);
router.get('/:id', getAlbum);
router.post('/', upload.single('image'), postAlbum);
router.put('/:id', upload.single('image'), updateAlbum);
router.delete('/:id', deleteAlbum);
<<<<<<< HEAD

=======
router.get('/recent/recent', getRecentAlbums);
>>>>>>> 0acce17aa23d4240c6398a7af0c66bdfa25be3ca
export default router;