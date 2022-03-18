import express from 'express';
import { getAlbums, postAlbum, updateAlbum, deleteAlbum, getAlbum } from '../controllers/albums.js';

const router = express.Router();

router.get('/', getAlbums);
router.get('/:id', getAlbum);
router.post('/', postAlbum);
router.put('/:id', updateAlbum);
router.delete('/:id', deleteAlbum);

export default router;