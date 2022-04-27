import { RatingGenreModel } from "../models/RatingGenreModel.js";

export const getRatingGenres = async (req, res) => {
    try {
        const ratingGenres = await RatingGenreModel.find();
        res.status(200).json(ratingGenres);
    } catch (err) {
        res.status(500).json({ error: err });
    }
};

export const getRatingGenre = async (req, res) => {
    try {
        const ratingGenre = await RatingGenreModel.findOne({ _id: req.params.id });
        res.status(200).json(ratingGenre);        
    } catch (err) {
        res.status(500).json({ error: err});
    }
};

export const postRatingGenre = async (req, res) => {
    try {
        const newRatingGenre = req.body;
        const ratingGenre = new RatingGenreModel(newRatingGenre);
        await ratingGenre.save();
        res.status(200).json(ratingGenre);
    } catch (err) {
        res.status(500).json({ error: err });
    }
};

export const updateRatingGenre = async (req, res) => {
    try {
        const updateRatingGenre = req.body;
        const ratingGenre = await RatingGenreModel.findOneAndUpdate({ _id: req.params.id }, updateRatingGenre, { new: true });
        res.status(200).json(ratingGenre);
    } catch (err) {
        res.status(500).json({ error: err });
    }
};

export const deleteRatingGenre = async (req, res) => {
    try {
        const ratingGenre = await RatingGenreModel.findOneAndDelete({ _id: req.params.id });
        res.status(200).json(ratingGenre);
    } catch (err) {
        res.status(500).json({ error: err });
    }
};