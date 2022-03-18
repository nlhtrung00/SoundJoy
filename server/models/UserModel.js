import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    name: {
        type: String,
        // required: true
    },
    birthday: {
        type: Date,
        // required: true
    },
    address: {
        type: String,
        // required: true
    },
    phone_number: {
        type: String,
        // required: true
    },
    registration_date: {
        type: Date,
        // required: true,
        default: Date.now
    },
    account: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account',
        // required: true
    }    
}, {
    versionKey: false,
}); //,{ timestamps: true} => createdAt + updatedAt

export const UserModel = mongoose.model('User', schema);