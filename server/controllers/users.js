import { UserModel } from "../models/UserModel.js";

export const getUsers = async (req, res) => {
    try {
        const users = await UserModel.find();
        // console.log('users', users);
        res.status(200).json(users);        
    } catch (err) {
        res.status(500).json({ error: err});
    }
};

export const postUser = async (req, res) => {
    try {
        const newUser = req.body;
        const user = new UserModel(newUser);

        await user.save();
        res.status(200).json(user);
    }catch (err) {
        console.log(err);
        res.status(500).json({ error: err });
    }
}; 

export const updateUser = async (req, res) => {
    try {
        const updateUser = req.body;
        const user = await UserModel.findOneAndUpdate({ _id: req.params.id }, updateUser, { new: true }); //dieu kien , gia tri moi, user = new?gia tri moi: gia tri cu
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({error: err});
    }
};

export const deletetUser = async (req, res) => {
    try {
        const idUser = req.params.id;
        const user = await UserModel.findOneAndDelete({ _id: idUser });
        res.status(200).json(user);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err });
    }
};