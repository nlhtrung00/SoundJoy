import express from 'express';
import { registerAccount, loginAccount, getAccounts, getAccount, deleteAccount } from '../controllers/accounts.js';

const router = express.Router();

router.get('/', getAccounts);
router.get('/:id', getAccount);
router.post('/register', registerAccount);
router.post('/login', loginAccount);
router.delete('/:id', deleteAccount);
export default router; 