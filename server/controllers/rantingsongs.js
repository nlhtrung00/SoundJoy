import { RatingSongModel } from "../models/RatingSongModel.js";

export const getRatingSongs = async (req, res) => {
    try {
        const ratingSongs = await RatingSongModel.find();
        res.status(200).json(ratingSongs);
    } catch (err) {
        res.status(500).json({ error: err });
    }
};

export const getRatingSong = async (req, res) => {
    try {
        const ratingSong = await RatingSongModel.findOne({ _id: req.params.id });
        res.status(200).json(ratingSong);        
    } catch (err) {
        res.status(500).json({ error: err});
    }
};

export const postRatingSong = async (req, res) => {
    try {
        const newRatingSong = req.body;
        const ratingSong = new RatingSongModel(newRatingSong);
        await ratingSong.save();
        res.status(200).json(ratingSong);
    } catch (err) {
        res.status(500).json({ error: err });
    }
};

export const updateRatingSong = async (req, res) => {
    try {
        const updateRatingSong = req.body;
        const ratingSong = await RatingSongModel.findOneAndUpdate({ _id: req.params.id }, updateRatingSong, { new: true });
        res.status(200).json(ratingSong);
    } catch (err) {
        res.status(500).json({ error: err });
    }
};

export const deleteRatingSong = async (req, res) => {
    try {
        const ratingSong = await RatingSongModel.findOneAndDelete({ _id: req.params.id });
        res.status(200).json(ratingSong);
    } catch (err) {
        res.status(500).json({ error: err });
    }
};