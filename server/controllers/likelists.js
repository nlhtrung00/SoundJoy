import cloudinary from '../cloudinary.js';
import { LikelistModel } from "../models/LikelistModel.js";

export const getLikelists = async (req, res) => {
    try {
        const likelists = await LikelistModel.find();
        res.status(200).json(likelists);
    } catch (err) {
        res.status(500).json({ error: err });
    }
};
export const getLikelistsByUser = async (req, res) => {
    try {
        const likelists = await LikelistModel.find({ user: req.params.id });
        res.status(200).json(likelists);
    } catch (err) {
        res.status(500).json({ error: err });
    }
};

export const getLikelist = async (req, res) => {
    try {
        const likelist = await LikelistModel.findOne({ _id: req.params.id });
        res.status(200).json(likelist);
    } catch (err) {
        res.status(500).json({ error: err });
    }
};
export const getLikelistsBySong = async (req, res) => {
    try {
        const likelists = await LikelistModel.find({ songs: req.params.songId });
        res.status(200).json(likelists);
    } catch (err) {
        res.status(500).json({ error: err });
    }
};

export const postLikelist = async (req, res) => {
    try {
        const newLikelist = req.body;
        if (req.file !== undefined) {
            const result = await cloudinary.uploader.upload(req.file.path, { folder: 'SoundJoy/Likelists', resource_type: 'auto' });
            newLikelist.image = result.secure_url;
            newLikelist.cloudinary_id = result.public_id;
        }
        const likelist = new LikelistModel(newLikelist);
        await likelist.save();
        res.status(200).json(likelist);
    } catch (err) {
        res.status(500).json({ error: err });
    }
};

export const updateLikelist = async (req, res) => {
    try {
        let likelist = await LikelistModel.findById(req.params.id);
        const updateLikelist = req.body;
        // console.log(req.file !== undefined)
        if (req.file !== undefined) {
            await cloudinary.uploader.destroy(likelist.cloudinary_id);
            const result = await cloudinary.uploader.upload(req.file.path, { folder: 'SoundJoy/Likelists', resource_type: 'auto' });
            updateLikelist.image = result.secure_url;
            updateLikelist.cloudinary_id = result.public_id;
        }
        likelist = await LikelistModel.findOneAndUpdate({ _id: req.params.id }, updateLikelist, { new: true });
        res.status(200).json(likelist);
    } catch (err) {
        res.status(500).json({ error: err });
    }
};

export const deleteLikelist = async (req, res) => {
    try {
        const likelist = await LikelistModel.findOneAndDelete({ _id: req.params.id });
        if(likelist.cloudinary_id){
            await cloudinary.uploader.destroy(likelist.cloudinary_id);
        }
        res.status(200).json(likelist);
    } catch (err) {
        res.status(500).json({ error: err });
    }
};