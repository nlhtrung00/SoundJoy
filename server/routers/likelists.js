import express from 'express';
import multer from 'multer';
import { getLikelists, postLikelist, updateLikelist, deleteLikelist, getLikelist } from '../controllers/likelists.js';

const storage = multer.diskStorage({
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname)
    }
});

const upload = multer({ storage: storage });

const router = express.Router();

router.get('/', getLikelists);
router.get('/:id', getLikelist);
router.post('/', upload.single('image'), postLikelist);
router.put('/:id', updateLikelist);
router.delete('/:id', deleteLikelist);

export default router;