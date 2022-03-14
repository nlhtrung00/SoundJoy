import express from 'express';
import { getMusicians, postMusician, updateMusician, deleteMusician, getMusician } from '../controllers/musicians.js';

const router = express.Router();

router.get('/', getMusicians);
router.get('/:id', getMusician);
router.post('/', postMusician);
router.put('/:id', updateMusician);
router.delete('/:id', deleteMusician);

export default router;
