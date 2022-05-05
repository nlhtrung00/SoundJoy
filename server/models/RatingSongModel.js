import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    rating: {
        type: Number,
        default:-1,
        // required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
        // required: true
    },
    song: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Song'
        // required: true
    }   
}, {
    versionKey: false,
    timestamps: true 
});

export const RatingSongModel = mongoose.model('RatingSong', schema);