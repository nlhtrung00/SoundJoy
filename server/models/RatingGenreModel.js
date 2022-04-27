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
    genre: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Genre'
        // required: true
    }   
}, {
    versionKey: false,
    timestamps: true 
});

export const RatingGenreModel = mongoose.model('RatingGenre', schema);