import mongoose from 'mongoose';

const schema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    is_admin: {
        type: Boolean,
        default: false
    }
}, {
    versionKey: false,
    timestamps: true 
});

export const AccountModel = mongoose.model('Account', schema);