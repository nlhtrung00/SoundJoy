import express from 'express';
import { getAlbums, postAlbum, updateAlbum, deleteAlbum } from '../controllers/albums.js';

const router = express.Router();

router.get('/', getAlbums);
router.post('/', postAlbum);
router.put('/:id', updateAlbum);
router.delete('/:id', deleteAlbum);

export default router;