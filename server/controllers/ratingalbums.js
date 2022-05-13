import { RatingAlbumModel } from "../models/RatingAlbumModel.js";



export const getRatingAlbums = async (req, res) => {
    try {
        const ratingAlbums = await RatingAlbumModel.find();
        res.status(200).json(ratingAlbums);
    } catch (err) {
        res.status(500).json({ error: err });
    }
};

export const getRatingAlbum = async (req, res) => {
    try {
        const ratingAlbum = await RatingAlbumModel.findOne({ _id: req.params.id });
        res.status(200).json(ratingAlbum);        
    } catch (err) {
        res.status(500).json({ error: err});
    }
};

export const postRatingAlbum = async (req, res) => {
    try {
        const newRatingAlbum = req.body;
        const ratingAlbum = new RatingAlbumModel(newRatingAlbum);
        await ratingAlbum.save();
        res.status(200).json(ratingAlbum);
    } catch (err) {
        res.status(500).json({ error: err });
    }
};

export const updateRatingAlbum = async (req, res) => {
    try {
        const updateRatingAlbum = req.body;
        const ratingAlbum = await RatingAlbumModel.findOneAndUpdate({ _id: req.params.id }, updateRatingAlbum, { new: true });
        res.status(200).json(ratingAlbum);
    } catch (err) {
        res.status(500).json({ error: err });
    }
};

export const deleteRatingAlbum = async (req, res) => {
    try {
        const ratingAlbum = await RatingAlbumModel.findOneAndDelete({ _id: req.params.id });
        res.status(200).json(ratingAlbum);
    } catch (err) {
        res.status(500).json({ error: err });
    }
};