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
    reactions: {
        type: Number,
        // required: true,
        default: 0
    },
    debuted_date: {
        type: Date,
        default: Date.now,
        // required: true
    },
    genre: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Genre',
        // required: true,
    },
}, {
    versionKey: false
});

export const AlbumModel = mongoose.model('Album', schema);