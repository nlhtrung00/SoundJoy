import cloudinary from '../cloudinary.js';
import { GenreModel } from '../models/GenreModel.js';

export const getGenres = async (req, res) => {
    try {
        const genres = await GenreModel.find();
        res.status(200).json(genres);
    } catch (err) {
        res.status(500).json({ error: err});
    }
};

export const getGenre = async (req, res) => {
    try {
        const genre = await GenreModel.find({ _id: req.params.id });
        res.status(200).json(genre);
    } catch (err) {
        res.status(500).json({ error: err});
    }
};

export const postGenre = async (req, res) => {
    try {
        const result = await cloudinary.uploader.upload(req.file.path, { folder: 'SoundJoy/Genres', resource_type: 'auto' });
        const newGenre = req.body;
        newGenre.image = result.secure_url;
        const genre = new GenreModel(newGenre);
        await genre.save();
        res.status(200).json(genre);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err});
    }
};

export const updateGenre = async (req, res) => {
    try {
        const updateGenre = req.body;
        const genre = await GenreModel.findOneAndUpdate({ _id: req.params.id }, updateGenre, { new: true });
        res.status(200).json(genre);
    } catch (err) {
        res.status(500).json({ error: err });
    }
};

export const deleteGenre = async (req, res) => {
    try {
        const genre = await GenreModel.findOneAndDelete({ _id: req.params.id });
        res.status(200).json(genre);
    } catch (err) {
        res.status(500).json({ error: err });
    }
};