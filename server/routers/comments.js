import express from 'express';
import { getComments, postComment,getCommentsBySong,updateComment, deleteComment } from '../controllers/comments.js';

const router = express.Router();

router.get('/', getComments);
router.get('/song/:id', getCommentsBySong);
router.post('/', postComment);
router.put('/:id', updateComment);
router.delete('/:id', deleteComment);

export default router;