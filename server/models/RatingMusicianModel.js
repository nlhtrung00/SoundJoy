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
    musician: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Musician'
        // required: true
    }   
}, {
    versionKey: false,
    timestamps: true 
});

export const RatingMusicianModel = mongoose.model('RatingMusician', schema);