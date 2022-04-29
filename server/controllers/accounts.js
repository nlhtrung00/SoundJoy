import { AccountModel } from "../models/AccountModel.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UserModel } from "../models/UserModel.js";

let refreshTokens = [];

export const refresh = (req, res) => {
    const refreshToken = req.body.token;
    if (refreshToken == null) return res.status(400);
    if (!refreshTokens.includes(refreshToken)) return res.sendStatus(400);
    jwt.verify(refreshToken, 'ecaps', (err, data) =>{
        if (err) return res.sendStatus(400);
        const accessToken = generateAccessToken({ name: data.name });
        res.status(200).json({ accessToken: accessToken });
    })
}

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
        const username = req.body.username;
        const password = req.body.password;
        const account = await AccountModel.findOne({ username: username });
        if (!account) return res.status(400).json({ message: 'Username is not found!'});
        
        const validPass = await bcrypt.compare(password, account.password);    
        if (!validPass)return res.status(400).json({ message: 'Invalid password'});
        //jwt
        const data = { name: username };
        const accessToken = generateAccessToken(data);
        const refreshToken = jwt.sign(data, 'ecaps');
        refreshTokens.push(refreshToken);
        res.status(200).json({ message: 'Login success!', islogged:true, accountId:account._id, accessToken: accessToken, refreshToken: refreshToken });
    } catch (err) {
        res.status(500).json({ error: err });
    }
};

function generateAccessToken(data) {
    return jwt.sign(data, 'space', { expiresIn: '20s' });
}

export const getAccounts = async (req, res)=>{
    try{
        const accounts = await AccountModel.find();
        res.status(200).json(accounts);
    }catch(err){
        res.status(500).json({error:err})
    }
}

export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.status(400);
    jwt.verify(token, 'space', (err, data) => {
        if (err) return res.sendStatus(403);
        req.data = data;
        next()
    })
}

export const getAccount = async (req, res) => {
    try {
        const accounts = await AccountModel.find();
        // console.log(req);
        res.status(200).json(accounts.filter(account => account.username === req.data.name));    
    } catch (err) {
        res.status(500).json({ error: err});
    }
};
export const deleteAccount = async (req, res) => {
    try {
        const account = await AccountModel.findOneAndDelete({ _id: req.params.id });
        const user = await UserModel.findByIdAndDelete({ _id: account._id });
        res.status(200).json({ account: account, user: user });
    } catch (err) {
        res.status(500).json({ error: err });
    }
};

export const logout = (req, res) => {
    refreshTokens = refreshTokens.filter(token => token !== req.body.token);
    res.sendStatus(200);
};