import express from 'express';
import { registerAccount, loginAccount } from '../controllers/accounts.js';

const router = express.Router();

router.post('/register', registerAccount);
router.post('/login', loginAccount);
export default router; 