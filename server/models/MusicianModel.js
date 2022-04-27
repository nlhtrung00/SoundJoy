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
    }
}, {
    versionKey: false,
    timestamps: true 
});

export const MusicianModel = mongoose.model('Musician', schema);