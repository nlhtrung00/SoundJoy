import cloudinary from "../cloudinary.js";
import { AlbumModel } from "../models/AlbumModel.js";

export const getAlbums = async (req, res) => {
    try {
        const albums = await AlbumModel.find();
        res.status(200).json(albums);
    } catch (err) {
        res.status(500).json({ error: err });
    }
};

export const getAlbum = async (req, res) => {
    try {
        const album = await AlbumModel.find({ _id: req.params.id });
        res.status(200).json(album);
    } catch (err) {
        res.status(500).json({ error: err });
    }
};

export const postAlbum = async (req, res) => {
    try {
        const result = await cloudinary.uploader.upload(req.file.path, { folder: 'SoundJoy/Albums', resource_type: 'auto' });
        const newAlbum = req.body;
        newAlbum.image = result.secure_url;
        newAlbum.cloudinary_id = result.public_id;
        const album = new AlbumModel(newAlbum);
        await album.save();
        res.status(200).json(album);
    } catch (err) {
        res.status(500).json({ error: err });
    }
};

export const updateAlbum = async (req, res) => {
    try {
        let album = await AlbumModel.findById(req.params.id);
        const updateAlbum = req.body;
        if (req.file !== undefined){
            await cloudinary.uploader.destroy(album.cloudinary_id);
            const result = await cloudinary.uploader.upload(req.file.path, { folder: 'SoundJoy/Albums', resource_type: 'auto' });
            updateAlbum.image = result.secure_url;
            updateAlbum.cloudinary_id = result.public_id;
        }
        album = await AlbumModel.findByIdAndUpdate({ _id: req.params.id }, updateAlbum, { new: true });
        res.status(200).json(album);
    } catch (err) {
        res.status(500).json({ error: err });
    }
};

export const deleteAlbum = async (req, res) => {
    try {
        const album = await AlbumModel.findOneAndDelete({ _id: req.params.id });
        await cloudinary.uploader.destroy(album.cloudinary_id);
        res.status(200).json(album);
    } catch (err) {
        res.status(500).json({ error: err });
    }
};