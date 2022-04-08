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
    },
    image: {
        type: String,
        default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMqI4dJM6gAS7v_jKJy0_bCkeqZpZ-_vPO67WSQpi-9wqkdqScFvd57VvMG3qS2NnbzXU&usqp=CAU"
    }    
}, {
    versionKey: false,
}); //,{ timestamps: true} => createdAt + updatedAt

export const UserModel = mongoose.model('User', schema);