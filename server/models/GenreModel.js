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
    cloudinary_id: {
        type: String
    }
},{
    versionKey: false
});

export const GenreModel = mongoose.model('Genre', schema);