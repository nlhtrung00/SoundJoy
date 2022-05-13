import { RatingMusicianModel } from "../models/RatingMusicianModel.js";

export const getRatingMusicians = async (req, res) => {
    try {
        const ratingMusicians = await RatingMusicianModel.find();
        res.status(200).json(ratingMusicians);
    } catch (err) {
        res.status(500).json({ error: err });
    }
};

export const getRatingMusician = async (req, res) => {
    try {
        const ratingMusician = await RatingMusicianModel.findOne({ _id: req.params.id });
        res.status(200).json(ratingMusician);        
    } catch (err) {
        res.status(500).json({ error: err});
    }
};

export const postRatingMusician = async (req, res) => {
    try {
        const newRatingMusician = req.body;
        const ratingMusician = new RatingMusicianModel(newRatingMusician);
        await ratingMusician.save();
        res.status(200).json(ratingMusician);
    } catch (err) {
        res.status(500).json({ error: err });
    }
};

export const updateRatingMusician = async (req, res) => {
    try {
        const updateRatingMusician = req.body;
        const ratingMusician = await RatingMusicianModel.findOneAndUpdate({ _id: req.params.id }, updateRatingMusician, { new: true });
        res.status(200).json(ratingMusician);
    } catch (err) {
        res.status(500).json({ error: err });
    }
};

export const deleteRatingMusician = async (req, res) => {
    try {
        const ratingMusician = await RatingMusicianModel.findOneAndDelete({ _id: req.params.id });
        res.status(200).json(ratingMusician);
    } catch (err) {
        res.status(500).json({ error: err });
    }
};