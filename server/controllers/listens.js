import { ListenModel } from "../models/ListenModel.js";


export const getListens = async (req, res) => {
    try {
        const listens = await ListenModel.find();
        res.status(200).json(listens);
    } catch (err) {
        res.status(500).json({ error: err });
    }
};

export const getListen = async (req, res) => {
    try {
        const listen = await ListenModel.findOne({ _id: req.params.id });
        res.status(200).json(listen);        
    } catch (err) {
        res.status(500).json({ error: err});
    }
};
export const getListenBySongWithUser = async (req, res) => {
    try {
        const listen = await ListenModel.findOne({ song: req.params.songId,user:req.params.userId });
        res.status(200).json(listen);        
    } catch (err) {
        res.status(500).json({ error: err});
    }
};
export const getListensBySong = async (req, res) => {
    try {
        const listens = await ListenModel.find({ song: req.params.songId});
        res.status(200).json(listens);
    } catch (err) {
        res.status(500).json({ error: err });
    }
};

export const postListen = async (req, res) => {
    try {
        const newListen = req.body;
        const listen = new ListenModel(newListen);
        await listen.save();
        res.status(200).json(listen);
    } catch (err) {
        res.status(500).json({ error: err });
    }
};

export const updateListen = async (req, res) => {
    try {
        const updateListen = req.body;
        const listen = await ListenModel.findOneAndUpdate({ _id: req.params.id }, updateListen, { new: true });
        res.status(200).json(listen);
    } catch (err) {
        res.status(500).json({ error: err });
    }
};

export const deleteListen = async (req, res) => {
    try {
        const listen = await ListenModel.findOneAndDelete({ _id: req.params.id });
        res.status(200).json(listen);
    } catch (err) {
        res.status(500).json({ error: err });
    }
};
