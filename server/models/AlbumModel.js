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
    genre: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Genre',
        // required: true,
    }],
    musician: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Musician'
    }],
    singer: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Singer'
    }],
    cloudinary_id: {
        type: String
    },
    rating : {
        type: Number,
        default:-1,
        // required: true
    }
}, {
    versionKey: false,
    timestamps: true 
});

export const AlbumModel = mongoose.model('Album', schema);