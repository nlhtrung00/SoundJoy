import { CommentModel } from "../models/CommentModel.js";

export const getComments = async (req, res) => {
    try {
        const comments = await CommentModel.find();
        res.status(200).json(comments);
    } catch (err) {
        res.status(500).json({ error: err });
    }
};
export const getCommentsBySong = async (req, res) => {
    try {
        const comments = await CommentModel.find({song:req.params.id}).sort("-commented_date");
        res.status(200).json(comments);
    } catch (err) {
        res.status(500).json({ error: err });
    }
};

export const postComment = async (req, res) => {
    try {
        const newComment = req.body;
        const comment = new CommentModel(newComment);
        await comment.save();
        res.status(200).json(comment);
    } catch (err) {
        res.status(500).json({ error: err });
    }
};

export const updateComment = async (req, res) => {
    try {
        const updateComment = req.body;
        const comment = await CommentModel.findOneAndUpdate({ _id: req.params.id }, updateComment, { new: true });
        res.status(200).json(comment);
    } catch (err) {
        res.status(500).json({ error: err });
    }
};

export const deleteComment = async (req, res) => {
    try {
        const comment = await CommentModel.findOneAndDelete({ _id: req.params.id });
        res.status(200).json(comment);
    } catch (err) {
        res.status(500).json({ error: err });
    }
};