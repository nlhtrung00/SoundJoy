import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    name: {
        type: String,
        // required: true
    },
    image: {
        type: String,
        // required: true
    }
},{
    versionKey: false
});

export const GenreModel = mongoose.model('Genre', schema);