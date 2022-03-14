import { SongModel } from "../models/SongModel.js";

export const getSongs = async (req, res) => {
    try {
        const songs = await SongModel.find();
        res.status(200).json(songs);
    } catch (err) {
        res.status(500).json({ error: err });
    }    
};

export const getSong = async (req, res) => {
    try {
        const song = await SongModel.find({ _id: req.params._id });
        res.status(200).json(song);
    } catch (err) {
        res.status(500).json({ error: err });
    }    
};

export const postSong = async (req, res) => {
    try {
        const newSong = req.body;
        const song = new SongModel(newSong);
        await song.save();
        res.status(200).json(song);
    } catch (err) {
        res.status(500).json({ error: err });
    }    
};

export const updateSong = async (req, res) => {
    try {
        const updateSong = req.body;
        const song = await SongModel.findOneAndUpdate({ _id: req.params.id }, updateSong, { new: true });
        res.status(200).json(song);
    } catch (err) {
        res.status(500).json({ error: err });
    }    
};

export const deleteSong = async (req, res) => {
    try {
        const song = await SongModel.findOneAndDelete({ _id: req.params.id });
        res.status(200).json(song);
    } catch (err) {
        res.status(500).json({ error: err });
    }    
};