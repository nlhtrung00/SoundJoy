import express from 'express';
import multer from 'multer';
import { getLikelists,getLikelistsBySong, postLikelist, updateLikelist, deleteLikelist, getLikelist,getLikelistsByUser } from '../controllers/likelists.js';

const storage = multer.diskStorage({
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname)
    }
});

const upload = multer({ storage: storage });

const router = express.Router();

router.get('/', getLikelists);
router.get('/getbysong/:songId', getLikelistsBySong);
router.get('/user/:id', getLikelistsByUser);
router.get('/:id', getLikelist);
router.post('/', upload.single('image'), postLikelist);
router.put('/:id', upload.single('image'), updateLikelist);
router.delete('/:id', deleteLikelist);

export default router;