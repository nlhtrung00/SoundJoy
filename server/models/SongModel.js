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
    listens: {
        type: Number,
        // required: true
        default: 0
    },
    debuted_date: {
        type: Date,
        default: Date.now,
        // required: true
    },
    musician: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Musician'
    }],
    singer: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Singer'
    }],
    album: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Album'
    },
    genre: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Genre',
        // required: true
    }],
    link_mp3: {
        type: String,
        // required: true
    },
    cloudinary_image_id: {
        type: String
    },
    cloudinary_mp3_id: {
        type: String
    },
    rating : {
        type: Number,
        default:-1,
        // required: true
    }
},{
    versionKey: false,
    timestamps: true 
});

export const SongModel = mongoose.model('Song', schema);