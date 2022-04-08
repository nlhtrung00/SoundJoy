import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    song: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Song'
        // required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
        // required: true
    },
    weight: {
        type: Number,
        // required: true
    }
}, {
    versionKey: false
});

export const ListenModel = mongoose.model('Listen', schema);