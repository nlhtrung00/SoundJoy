import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    rating: {
        type: Number,
        // required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
        // required: true
    },
    album: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Album'
        // required: true
    }   
}, {
    versionKey: false,
    timestamps: true 
});

export const RatingAlbumModel = mongoose.model('RatingAlbum', schema);