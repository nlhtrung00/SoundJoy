import express from 'express';
import { deletetUser, getUsers , postUser, updateUser} from '../controllers/users.js';

const router = express.Router();

router.get('/', getUsers);
router.post('/', postUser);
router.put('/:id', updateUser);
router.delete('/:id', deletetUser);

export default router;