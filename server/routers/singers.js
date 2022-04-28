import express from 'express';
import multer from 'multer';
import { getSingers, postSinger, updateSinger, deleteSinger, getSinger, getRecentSingers, getTopSingers } from '../controllers/singers.js';

const storage = multer.diskStorage({
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname)
    }
});

const upload = multer({ storage: storage });
const router = express.Router();

router.get('/', getSingers);
router.get('/:id', getSinger);
router.post('/', upload.single('image'), postSinger);
router.put('/:id', upload.single('image'), updateSinger);
router.delete('/:id', deleteSinger);
router.get('/recent/recent', getRecentSingers);
router.get('/top', getTopSingers);

export default router;
