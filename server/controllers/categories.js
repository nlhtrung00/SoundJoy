import { CategoryModel } from '../models/CategoryModel.js';

export const getCategories = async (req, res) => {
    try {
        const categories = await CategoryModel.find();
        res.status(200).json(categories);
    } catch (err) {
        res.status(500).json({ error: err});
    }
};

export const postCategory = async (req, res) => {
    try {
        const newCategory = req.body;
        const category = new CategoryModel(newCategory);
        await category.save();
        res.status(200).json(category);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err});
    }
};

export const updateCategory = async (req, res) => {
    try {
        const updateCategory = req.body;
        const category = await CategoryModel.findOneAndUpdate({ _id: req.params.id}, updateCategory, {new: true});
        res.status(200).json(category);
    } catch (err) {
        res.status(500).json({ error: err });
    }
};

export const deleteCategory = async (req, res) => {
    try {
        const category = await CategoryModel.findOneAndDelete({ _id: req.params.id });
        res.status(200).json(category);
    } catch (err) {
        res.status(500).json({ error: err });
    }
};