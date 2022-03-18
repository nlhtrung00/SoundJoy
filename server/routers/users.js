import express from 'express';
import { deletetUser, getUser, getUsers , postUser, updateUser } from '../controllers/users.js';

const router = express.Router();

router.get('/', getUsers);
router.get('/:id', getUser);
router.post('/', postUser);
router.put('/:id', updateUser);
router.delete('/:id', deletetUser);

export default router;