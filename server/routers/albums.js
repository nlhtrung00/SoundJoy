import express from 'express';
import multer from 'multer';
import { getAlbums, postAlbum, updateAlbum, deleteAlbum, getAlbum } from '../controllers/albums.js';

const storage = multer.diskStorage({
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname)
    }
});

const upload = multer({ storage: storage });

const router = express.Router();

router.get('/', getAlbums);
router.get('/:id', getAlbum);
router.post('/', upload.single('image'), postAlbum);
router.put('/:id', updateAlbum);
router.delete('/:id', deleteAlbum);

export default router;