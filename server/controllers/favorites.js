import { FavoriteModel } from "../models/FavoriteModel.js";

export const getFavorites = async (req, res) => {
    try {
        const favorites = await FavoriteModel.find();
        res.status(200).json(favorites);
    } catch (err) {
        res.status(500).json({ error : err });
    }
};

export const postFavorite = async (req, res) => {
    try {
        const newFavorite = req.body;
        const favorite = new FavoriteModel(newFavorite);
        await favorite.save();
        res.status(200).json(favorite);
    } catch (err) {
        res.status(500).json({ error : err });
    }
};

export const updateFavorite = async (req, res) => {
    try {
        const updateFavorite = req.body;
        const favorite = await FavoriteModel.findOneAndUpdate({ _id: req.params.id }, updateFavorite, { new: true });
        res.status(200).json(favorite);
    } catch (err) {
        res.status(500).json({ error : err });
    }
};

export const deleteFavorite = async (req, res) => {
    try {
        const favorite = await FavoriteModel.findOneAndDelete({ _id: req.params.id });
        res.status(200).json(favorite);
    } catch (err) {
        res.status(500).json({ error : err });
    }
};