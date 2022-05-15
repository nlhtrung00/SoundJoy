import cloudinary from "../cloudinary.js";
import { MusicianModel } from "../models/MusicianModel.js";

export const getMusicians = async (req, res) => {
    try {
        const musicians = await MusicianModel.find();
        res.status(200).json(musicians);
    } catch (err) {
        res.status(500).json({ error: err });
    }
};
export const searchMusicians = async (req, res) => {
    try {
        var regex = new RegExp(req.params.searchTerm, 'i');
        const musicians = await MusicianModel.find({ 
            $or:[
                {name: regex}
            ]
            
        
        });
        res.status(200).json(musicians);
    } catch (err) {
        res.status(500).json({ error: err });
    }
};
export const getMusician = async (req, res) => {
    try {
        const musician = await MusicianModel.findOne({ _id: req.params.id });
        res.status(200).json(musician);
    } catch (err) {
        res.status(500).json({ error: err });
    }
};

export const getRecentMusicians = async (req, res) => {
    try {
        const today = new Date();
        const tomorrow = new Date(today - 24*60*60*1000);
        const musicians = await MusicianModel.find({ createdAt :{ $gt: tomorrow, $lte: today } });
        res.status(200).json(musicians);
    } catch (err) {
        res.status(500).json({ error: err });
    }    
};

export const getTopMusicians = async (req, res) => {
    try {
        const musicians = await MusicianModel.find().limit(10).sort('-rating createdAt');
        res.status(200).json(musicians);
    } catch (err) {
        res.status(500).json({ error: err });
    }    
};

export const postMusician = async (req, res) => {
    try {
        const result = await cloudinary.uploader.upload(req.file.path, { folder: 'SoundJoy/Musicians', resource_type: 'auto' });
        const newMusician = req.body;
        newMusician.image = result.secure_url;
        newMusician.cloudinary_id = result.public_id;
        const musician = new MusicianModel(newMusician);
        await musician.save();
        res.status(200).json(musician);
    } catch (err) {
        res.status(500).json({ error: err});
    }
};

export const updateMusician = async (req, res) => {
    try {
        let musician = await MusicianModel.findById(req.params.id);
        let updateMusician = req.body;
        if (req.file !== undefined){
            await cloudinary.uploader.destroy(musician.cloudinary_id);
            const result = await cloudinary.uploader.upload(req.file.path, { folder: 'SoundJoy/Musicians', resource_type: 'auto' });
            updateMusician.image = result.secure_url;
            updateMusician.cloudinary_id = result.public_id;
        }
        musician = await MusicianModel.findOneAndUpdate({ _id: req.params.id }, updateMusician, { new: true });
        res.status(200).json(musician);
    } catch (err) {
        res.status(500).json({ error: err });
    }
};

export const deleteMusician = async (req, res) => {
    try {
        const musician = await MusicianModel.findOneAndDelete({ _id: req.params.id });
        if (musician.cloudinary_id !== undefined){
            await cloudinary.uploader.destroy(musician.cloudinary_id);
        }
        res.status(200).json(musician);
    } catch (err) {
        res.status(500).json({ error: err });
    }
};
