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
        const likelist = await LikelistModel.find({ _id: req.params._id });
        res.status(200).json(likelist);
    } catch (err) {
        res.status(500).json({ error : err });
    }
};

export const postLikelist = async (req, res) => {
    try {
        const newLikelist = req.body;
        const likelist = new LikelistModel(newLikelist);
        await likelist.save();
        res.status(200).json(likelist);
    } catch (err) {
        res.status(500).json({ error : err });
    }
};

export const updateLikelist = async (req, res) => {
    try {
        const updateLikelist = req.body;
        const likelist = await LikelistModel.findOneAndUpdate({ _id: req.params.id }, updateLikelist, { new: true });
        res.status(200).json(likelist);
    } catch (err) {
        res.status(500).json({ error : err });
    }
};

export const deleteLikelist = async (req, res) => {
    try {
        const likelist = await LikelistModel.findOneAndDelete({ _id: req.params.id });
        res.status(200).json(likelist);
    } catch (err) {
        res.status(500).json({ error : err });
    }
};