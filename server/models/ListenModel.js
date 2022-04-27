import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    weight: {
        type: Number,
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

export const ListenModel = mongoose.model('Listen', schema);