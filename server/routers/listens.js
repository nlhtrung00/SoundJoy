import express from 'express';
import { deleteListen, getListen,getListenBySongWithUser, getListens, postListen, updateListen,getListensBySong } from '../controllers/listens.js';

const router = express.Router();

router.get('/', getListens);
router.get('/getbysong/:songId', getListensBySong);
router.get('/getbysongwithuser/:songId/:userId', getListenBySongWithUser);
router.get('/:id', getListen);
router.post('/', postListen);
router.put('/:id', updateListen);
router.delete('/:id', deleteListen);

export default router;