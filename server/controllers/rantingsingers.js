import { RatingSingerModel } from "../models/RatingSingerModel.js";

export const getRatingSingers = async (req, res) => {
    try {
        const ratingSingers = await RatingSingerModel.find();
        res.status(200).json(ratingSingers);
    } catch (err) {
        res.status(500).json({ error: err });
    }
};

export const getRatingSinger = async (req, res) => {
    try {
        const ratingSinger = await RatingSingerModel.findOne({ _id: req.params.id });
        res.status(200).json(ratingSinger);        
    } catch (err) {
        res.status(500).json({ error: err});
    }
};

export const postRatingSinger = async (req, res) => {
    try {
        const newRatingSinger = req.body;
        const ratingSinger = new RatingSingerModel(newRatingSinger);
        await ratingSinger.save();
        res.status(200).json(ratingSinger);
    } catch (err) {
        res.status(500).json({ error: err });
    }
};

export const updateRatingSinger = async (req, res) => {
    try {
        const updateRatingSinger = req.body;
        const ratingSinger = await RatingSingerModel.findOneAndUpdate({ _id: req.params.id }, updateRatingSinger, { new: true });
        res.status(200).json(ratingSinger);
    } catch (err) {
        res.status(500).json({ error: err });
    }
};

export const deleteRatingSinger = async (req, res) => {
    try {
        const ratingSinger = await RatingSingerModel.findOneAndDelete({ _id: req.params.id });
        res.status(200).json(ratingSinger);
    } catch (err) {
        res.status(500).json({ error: err });
    }
};