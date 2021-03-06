import express from 'express';
import multer from 'multer';
import {updateEmptyFollowMusician,updateEmptyFollowSinger, deletetUser, getRecentUsers, getUser,getUserByAccount, getUsers , postUser, updateUser } from '../controllers/users.js';

const storage = multer.diskStorage({
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname)
    }
});

const upload = multer({ storage: storage });

const router = express.Router();

router.get('/', getUsers);
router.get('/:id', getUser);
router.get('/account/:account', getUserByAccount);
router.post('/', upload.single('image'), postUser);
router.put('/:id', upload.single('image'), updateUser);
router.put('/emptyfollow_musician/:id', updateEmptyFollowMusician);
router.put('/emptyunfollow_singer/:id', updateEmptyFollowSinger);
router.delete('/:id', deletetUser);
router.get('/recent/recent', getRecentUsers);

export default router;