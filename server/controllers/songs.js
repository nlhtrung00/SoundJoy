import  cloudinary  from "../cloudinary.js";
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

export const getSongByGenre = async (req, res) => {
    try {
        const songs = await SongModel.find({ genre: req.params._id });
        res.status(200).json(songs);
    } catch (err) {
        res.status(500).json({ error: err });
    }
};

export const getSongByAlbum = async (req, res) => {
    try {
        const songs = await SongModel.find({ album: req.params._id });
        res.status(200).json(songs);
    } catch (err) {
        res.status(500).json({ error: err });
    }
};

export const getSongByMusician = async (req, res) => {
    try {
        const songs = await SongModel.find({ musician: req.params._id });
        res.status(200).json(songs);
    } catch (err) {
        res.status(500).json({ error: err });
    }
};

export const getSongBySinger = async (req, res) => {
    try {
        const songs = await SongModel.find({ singer: req.params._id });
        res.status(200).json(songs);
    } catch (err) {
        res.status(500).json({ error: err });
    }
};

export const postSong = async (req, res) => {
    try {
        // cloudinary.v2.uploader.upload(file, options, callback);
        const resultImage = await cloudinary.uploader.upload(req.files.image[0].path, { folder : 'SoundJoy/Images', resource_type: 'auto' });
        const resultAudio = await cloudinary.uploader.upload(req.files.mp3[0].path, { folder : 'SoundJoy/Audios', resource_type: 'auto' });

       
        // console.log(resultImage);
        // console.log(resultAudio);
        const newSong = req.body;
        newSong.image = resultImage.secure_url;
        newSong.link_mp3 = resultAudio.secure_url;

        const song = new SongModel(newSong);
        // console.log(song);
        await song.save();
        res.status(200).json(song);
    } catch (err) {
        res.status(500).json({ error: err });
        console.log(err);
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