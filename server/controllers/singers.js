import cloudinary from "../cloudinary.js";
import { SingerModel } from "../models/SingerModel.js";

export const getSingers = async (req, res) => {
    try {
        const singers = await SingerModel.find();
        res.status(200).json(singers);
    } catch (err) {
        res.status(500).json({ error: err });
    }
};
export const searchSingers = async (req, res) => {
    try {
        var regex = new RegExp(req.params.searchTerm, 'i');
        const singers = await SingerModel.find({ 
            $or:[
                {name: regex}
            ]
            
        
        });
        res.status(200).json(singers);
    } catch (err) {
        res.status(500).json({ error: err });
    }
};
export const getSinger = async (req, res) => {
    try {
        const singer = await SingerModel.findOne({ _id: req.params.id });
        res.status(200).json(singer);
    } catch (err) {
        res.status(500).json({ error: err });
    }
};

export const getRecentSingers = async (req, res) => {
    try {
        const today = new Date();
        const tomorrow = new Date(today - 24*60*60*1000);
        const singers = await SingerModel.find({ createdAt :{ $gt: tomorrow, $lte: today } });
        res.status(200).json(singers);
    } catch (err) {
        res.status(500).json({ error: err });
    }    
};

export const getTopSingers = async (req, res) => {
    try {
        const singers = await SingerModel.find().limit(10).sort('-followers createdAt');
        res.status(200).json(singers);
    } catch (err) {
        res.status(500).json({ error: err });
    }    
};

export const postSinger = async (req, res) => {
    try {
        const result = await cloudinary.uploader.upload(req.file.path, { folder: 'SoundJoy/Singers', resource_type: 'auto' });
        const newSinger = req.body;
        newSinger.image = result.secure_url;
        newSinger.cloudinary_id = result.public_id;
        const singer = new SingerModel(newSinger);
        await singer.save();
        res.status(200).json(singer);
    } catch (err) {
        res.status(500).json({ error: err});
    }
};

export const updateSinger = async (req, res) => {
    try {
        let singer = await SingerModel.findById(req.params.id);
        let updateSinger = req.body;
        if (req.file !== undefined){
            await cloudinary.uploader.destroy(singer.cloudinary_id);
            const result = await cloudinary.uploader.upload(req.file.path, { folder: 'SoundJoy/Singers', resource_type: 'auto' });
            updateSinger.image = result.secure_url;
            updateSinger.cloudinary_id = result.public_id;
        }
        singer = await SingerModel.findOneAndUpdate({ _id: req.params.id }, updateSinger, { new: true });
        res.status(200).json(singer);
    } catch (err) {
        res.status(500).json({ error: err });
    }
};

export const deleteSinger = async (req, res) => {
    try {
        const singer = await SingerModel.findOneAndDelete({ _id: req.params.id });
        if (singer.cloudinary_id !== undefined){
            await cloudinary.uploader.destroy(singer.cloudinary_id);
        }
        res.status(200).json(singer);
    } catch (err) {
        res.status(500).json({ error: err });
    }
};
