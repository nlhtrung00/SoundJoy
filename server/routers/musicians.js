import express from 'express';
import multer from 'multer';
import { getMusicians, postMusician, updateMusician, deleteMusician, getMusician } from '../controllers/musicians.js';


const storage = multer.diskStorage({
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname)
    }
});

const upload = multer({ storage: storage });
const router = express.Router();

router.get('/', getMusicians);
router.get('/:id', getMusician);
router.post('/', upload.single('image'), postMusician);
router.put('/:id', updateMusician);
router.delete('/:id', deleteMusician);

export default router;
