import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    name: {
        type: String,
        // required: true
    },
    image: {
        type: String,
        // required: true
    },
    information: {
        type: String,
        // required: true
    },
    followers: {
        type: Number,
        // required: true,
        default: 0
    },
    cloudinary_id: {
        type: String
    },
    rating : {
        type: Number,
        // required: true
    }
}, {
    versionKey: false,
    timestamps: true 
});

export const SingerModel = mongoose.model('Singer', schema);