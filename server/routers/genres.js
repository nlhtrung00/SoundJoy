import express from 'express';
import multer from 'multer';
import { getGenres, postGenre, updateGenre, deleteGenre, getGenre } from '../controllers/genres.js';

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
router.put('/:id', updateGenre);
router.delete('/:id', deleteGenre);


export default router;