import { AccountModel } from "../models/AccountModel.js";
import bcrypt from 'bcryptjs';
import { UserModel } from "../models/UserModel.js";
export const registerAccount = async (req, res) => {
    try {
        const accountCheck = await AccountModel.findOne({ username: req.body.username });
        if (accountCheck) res.status(400).json({ message: 'username is already exist!', isSignedup:false});
        else{
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.password, salt);
            const account = new AccountModel({
                username: req.body.username,
                password: hashedPassword
            });
            await account.save();
            const idAccount = account._id;
            const user = new UserModel({
                name: req.body.name,
                birthday: req.body.birthday,
                address: req.body.address,
                phone_number: req.body.phone_number,
                account: idAccount
            });
            await user.save();
            res.status(200).json({ message: 'Signup success!', isSignedup:true});
        }
        
    } catch (err) {
        res.status(500).json({ error: err,isSignedup:false });
    }
};

export const loginAccount = async (req, res) => {
    try {
        const account = await AccountModel.findOne({ username: req.body.username });
        if (!account) res.status(400).json({ message: 'Username is not found!'});
        
        const validPass = await bcrypt.compare(req.body.password, account.password);    
        if (!validPass) res.status(400).json({ message: 'Invalid password'});
        res.status(200).json({ message: 'Login success!', isloged:true, accountId:account._id });
    } catch (err) {
        res.status(500).json({ error: err });
    }
};
export const getAccounts = async (req, res)=>{
    try{
        const accounts = await AccountModel.find();
        res.status(200).json(accounts);
    }catch(err){
        res.status(500).json({error:err})
    }
}
export const getAccount = async (req, res) => {
    try {
        const account = await AccountModel.findOne({ _id: req.params.id });
        
        res.status(200).json(account);    
    } catch (err) {
        res.status(500).json({ error: err});
    }
};
export const deleteAccount = async (req, res) => {
    try {
        const account = await AccountModel.findOneAndDelete({ _id: req.params.id });
        res.status(200).json(account);
    } catch (err) {
        res.status(500).json({ error: err });
    }
};