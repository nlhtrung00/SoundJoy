import express from 'express';
import multer from 'multer';
import { getMusicians,searchMusicians, postMusician, updateMusician, deleteMusician, getMusician, getRecentMusicians, getTopMusicians } from '../controllers/musicians.js';


const storage = multer.diskStorage({
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname)
    }
});

const upload = multer({ storage: storage });
const router = express.Router();

router.get('/', getMusicians);
router.get('/search/:searchTerm', searchMusicians);
router.get('/top', getTopMusicians);
router.get('/:id', getMusician);
router.post('/', upload.single('image'), postMusician);
router.put('/:id', upload.single('image'), updateMusician);
router.delete('/:id', deleteMusician);
router.get('/recent/recent', getRecentMusicians);

export default router;
