import express from 'express';
import { registerAccount, loginAccount, getAccounts, getAccount, deleteAccount, authenticateToken, refresh, logout } from '../controllers/accounts.js';

const router = express.Router();

// router.get('/', getAccounts);
router.get('/', authenticateToken, getAccount);
router.post('/register', registerAccount);
router.post('/login', loginAccount);
router.delete('/logout', logout);
router.post('/token', refresh);
router.delete('/:id', deleteAccount);
export default router; 