import { AlbumModel } from "../models/AlbumModel.js";

export const getAlbums = async (req, res) => {
    try {
        const albums = await AlbumModel.find();
        res.status(200).json(albums);
    } catch (err) {
        res.status(500).json({ error: err });
    }
};

export const postAlbum = async (req, res) => {
    try {
        const newAlbum = req.body;
        const album = new AlbumModel(newAlbum);
        await album.save();
        res.status(200).json(album);
    } catch (err) {
        res.status(500).json({ error: err });
    }
};

export const updateAlbum = async (req, res) => {
    try {
        const updateAlbum = req.body;
        const album = await AlbumModel.findByIdAndUpdate({ _id: req.params.id }, updateAlbum, { new: true });
        res.status(200).json(album);
    } catch (err) {
        res.status(500).json({ error: err });
    }
};

export const deleteAlbum = async (req, res) => {
    try {
        const album = await AlbumModel.findOneAndDelete({ _id: req.params.id });
        res.status(200).json(albums);
    } catch (err) {
        res.status(500).json({ error: err });
    }
};