import { SingerModel } from "../models/SingerModel.js";

export const getSingers = async (req, res) => {
    try {
        const singers = await SingerModel.find();
        res.status(200).json(singers);
    } catch (err) {
        res.status(500).json({ error: err });
    }
};

export const postSinger = async (req, res) => {
    try {
        const newSinger = req.body;
        const singer = new SingerModel(newSinger);
        await singer.save();
        res.status(200).json(singer);
    } catch (err) {
        res.status(500).json({ error: err});
    }
};

export const updateSinger = async (req, res) => {
    try {
        const updateSinger = req.body;
        const singer = await SingerModel.findOneAndUpdate({ _id: req.params.id }, updateSinger, { new: true });
        res.status(200).json(singer);
    } catch (err) {
        res.status(500).json({ error: err });
    }
};

export const deleteSinger = async (req, res) => {
    try {
        const singer = await SingerModel.findOneAndDelete({ _id: req.params.id });
        res.status(200).json(singer);
    } catch (err) {
        res.status(500).json({ error: err });
    }
};
