import express from 'express';
import multer from 'multer';
import { getGenres, postGenre, updateGenre, deleteGenre, getGenre, getRecentGenres } from '../controllers/genres.js';

const storage = multer.diskStorage({
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname)
    }
});

const upload = multer({ storage: storage });

const router = express.Router();

router.get('/', getGenres);
router.get('/:id', getGenre);
router.post('/', upload.single('image'), postGenre);
router.put('/:id', upload.single('image'), updateGenre);
router.delete('/:id', deleteGenre);
router.get('/recent', getRecentGenres);


export default router;