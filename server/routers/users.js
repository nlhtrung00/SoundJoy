import express from 'express';
import { deletetUser, getUser,getUserByAccount, getUsers , postUser, updateUser } from '../controllers/users.js';

const router = express.Router();

router.get('/', getUsers);
router.get('/:id', getUser);
router.get('/account/:account', getUserByAccount);
router.post('/', postUser);
router.put('/:id', updateUser);
router.delete('/:id', deletetUser);

export default router;