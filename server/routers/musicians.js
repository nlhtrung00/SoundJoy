import express from 'express';
import { getMusicians, postMusician, updateMusician, deleteMusician } from '../controllers/musicians.js';

const router = express.Router();

router.get('/', getMusicians);
router.post('/', postMusician);
router.put('/:id', updateMusician);
router.delete('/:id', deleteMusician);

export default router;
