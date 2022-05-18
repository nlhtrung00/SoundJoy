import cloudinary from '../cloudinary.js';
import { UserModel } from "../models/UserModel.js";

export const getUsers = async (req, res) => {
    try {
        const users = await UserModel.find();
        res.status(200).json(users);        
    } catch (err) {
        res.status(500).json({ error: err});
    }
};

export const getUser = async (req, res) => {
    try {
        const user = await UserModel.findOne({ _id: req.params.id });
        
        res.status(200).json(user);        
    } catch (err) {
        res.status(500).json({ error: err});
    }
};

export const getRecentUsers = async (req, res) => {
    try {
        const today = new Date();
        const tomorrow = new Date(today - 24*60*60*1000);
        const users = await UserModel.find({ createdAt :{ $gt: tomorrow, $lte: today } });
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ error: err });
    }    
};

export const getUserByAccount = async (req, res) => {
    try {
        const user = await UserModel.findOne({ account: req.params.account });
        res.status(200).json(user);        
    } catch (err) {
        res.status(500).json({ error: err});
    }
};

export const postUser = async (req, res) => {
    try {
        const result = await cloudinary.uploader.upload(req.file.path, { folder: 'SoundJoy/Users', resource_type: 'auto' });
        const newUser = req.body;
        newUser.image = result.secure_url;
        newUser.cloudinary_id = result.public_id;
        const user = new UserModel(newUser);
        await user.save();
        res.status(200).json(user);
    }catch (err) {
        res.status(500).json({ error: err });
    }
}; 

export const updateUser = async (req, res) => {
    try {
        let user = await UserModel.findById(req.params.id);
        let updateUser = req.body;
        if (req.file !== undefined){
            if(user.cloudinary_id){
                await cloudinary.uploader.destroy(user.cloudinary_id);
            }
            
            const result = await cloudinary.uploader.upload(req.file.path, { folder: 'SoundJoy/Users', resource_type: 'auto' });
            updateUser.image = result.secure_url;
            updateUser.cloudinary_id = result.public_id;
        }
        user = await UserModel.findOneAndUpdate({ _id: req.params.id }, updateUser, { new: true }); //dieu kien , gia tri moi, user = new?gia tri moi: gia tri cu
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({error: err});
    }
};
export const updateEmptyFollowMusician = async (req, res) => {
    try {
        
        var newvalues = {$set:{'follow_musician':[]}}
        let user = await UserModel.updateOne({ _id: req.params.id }, newvalues, { new: true }); //dieu kien , gia tri moi, user = new?gia tri moi: gia tri cu
        user = await UserModel.findOne({_id:req.params.id})
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({error: err});
    }
};
export const updateEmptyFollowSinger = async (req, res) => {
    try {
        
        var newvalues = {$set:{'follow_singer':[]}}
        let user = await UserModel.updateOne({ _id: req.params.id }, newvalues, { new: true }); //dieu kien , gia tri moi, user = new?gia tri moi: gia tri cu
        user = await UserModel.findOne({_id:req.params.id})
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({error: err});
    }
};

export const deletetUser = async (req, res) => {
    try {
        const user = await UserModel.findOneAndDelete({ _id: req.params.id });
        if (user.cloudinary_id !== undefined){
            await cloudinary.uploader.destroy(user.cloudinary_id);
        }
        res.status(200).json(user);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err });
    }
};