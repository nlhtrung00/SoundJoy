import express from 'express';
import { registerAccount,updateAccount, loginAccount, getAccounts, getAccount, deleteAccount, authenticateToken, refresh, logout, loginAccountAdmin } from '../controllers/accounts.js';

const router = express.Router();

// router.get('/', getAccounts);
router.get('/', authenticateToken, getAccount);
router.post('/register', registerAccount);
router.post('/admin/login', loginAccountAdmin);
router.post('/login', loginAccount);
router.put('/:id', updateAccount);
router.delete('/logout', logout);
router.post('/token', refresh);
router.delete('/:id', deleteAccount);
export default router; 