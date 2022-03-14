import { MusicianModel } from "../models/MusicianModel.js";

export const getMusicians = async (req, res) => {
    try {
        const musicians = await MusicianModel.find();
        res.status(200).json(musicians);
    } catch (err) {
        res.status(500).json({ error: err });
    }
};

export const getMusician = async (req, res) => {
    try {
        const musician = await MusicianModel.find({ _id: req.params._id });
        res.status(200).json(musician);
    } catch (err) {
        res.status(500).json({ error: err });
    }
};

export const postMusician = async (req, res) => {
    try {
        const newMusician = req.body;
        const musician = new MusicianModel(newMusician);
        await musician.save();
        res.status(200).json(musician);
    } catch (err) {
        res.status(500).json({ error: err});
    }
};

export const updateMusician = async (req, res) => {
    try {
        const updateMusician = req.body;
        const musician = await MusicianModel.findOneAndUpdate({ _id: req.params.id }, updateMusician, { new: true });
        res.status(200).json(musician);
    } catch (err) {
        res.status(500).json({ error: err });
    }
};

export const deleteMusician = async (req, res) => {
    try {
        const musician = await MusicianModel.findOneAndDelete({ _id: req.params.id });
        res.status(200).json(musician);
    } catch (err) {
        res.status(500).json({ error: err });
    }
};
