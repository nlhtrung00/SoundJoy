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
        const genre = await GenreModel.findOne({ _id: req.params.id });
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
        newGenre.cloudinary_id = result.public_id;
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
        let genre = await GenreModel.findById(req.params.id);
        let updateGenre = req.body;
        if (req.file !== undefined){
            await cloudinary.uploader.destroy(genre.cloudinary_id);
            const result = await cloudinary.uploader.upload(req.file.path, { folder: 'SoundJoy/Genres', resource_type: 'auto' });
            updateGenre.image = result.secure_url;
            updateGenre.cloudinary_id = result.public_id;
        }
        genre = await GenreModel.findOneAndUpdate({ _id: req.params.id }, updateGenre, { new: true });
        res.status(200).json(genre);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err });
    }
};

export const deleteGenre = async (req, res) => {
    try {
        const genre = await GenreModel.findOneAndDelete({ _id: req.params.id });
        if (genre.cloudinary_id !== undefined){
            await cloudinary.uploader.destroy(genre.cloudinary_id);
        }
        res.status(200).json(genre);
    } catch (err) {
        res.status(500).json({ error: err });
    }
};