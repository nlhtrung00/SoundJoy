import cloudinary from '../cloudinary.js';
import { LikelistModel } from "../models/LikelistModel.js";

export const getLikelists = async (req, res) => {
    try {
        const likelists = await LikelistModel.find();
        res.status(200).json(likelists);
    } catch (err) {
        res.status(500).json({ error : err });
    }
};

export const getLikelist = async (req, res) => {
    try {
        const likelist = await LikelistModel.find({ _id: req.params.id });
        res.status(200).json(likelist);
    } catch (err) {
        res.status(500).json({ error : err });
    }
};

export const postLikelist = async (req, res) => {
    try {
        const result = await cloudinary.uploader.upload(req.file.path, { folder: 'SoundJoy/Likelists', resource_type: 'auto' });
        const newLikelist = req.body;
        newLikelist.image = result.secure_url;
        newLikelist.cloudinary_id = result.public_id;
        const likelist = new LikelistModel(newLikelist);
        await likelist.save();
        res.status(200).json(likelist);
    } catch (err) {
        res.status(500).json({ error : err });
    }
};

export const updateLikelist = async (req, res) => {
    try {
        let likelist = await LikelistModel.findById(req.params.id);
        const updateLikelist = req.body;
        if (req.file !== undefined){
            await cloudinary.uploader.destroy(likelist.cloudinary_id);
            const result = await cloudinary.uploader.upload(req.file.path, { folder: 'SoundJoy/Likelists', resource_type: 'auto' });
            updateLikelist.image = result.secure_url;
            updateLikelist.cloudinary_id = result.public_id;
        }
        likelist = await LikelistModel.findOneAndUpdate({ _id: req.params.id }, updateLikelist, { new: true });
        res.status(200).json(likelist);
    } catch (err) {
        res.status(500).json({ error : err });
    }
};

export const deleteLikelist = async (req, res) => {
    try {
        const likelist = await LikelistModel.findOneAndDelete({ _id: req.params.id });
        await cloudinary.uploader.destroy(likelist.cloudinary_id);
        res.status(200).json(likelist);
    } catch (err) {
        res.status(500).json({ error : err });
    }
};