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
    created_day: {
        type: Date,
        default: Date.now,
        // required: true
    },
    songs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Song'
    }],
    number_of_songs: {
        type: Number,
        default: 0,
        // required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        // required: true
    },
    album: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Album'
    }]
}, {
    versionKey: false
});

export const LikelistModel = mongoose.model('Likelist', schema);