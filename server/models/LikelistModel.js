import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    name: {
        type: String,
        // required: true
    },
    image: {
        type: String,
        default:'https://images.pexels.com/photos/2231756/pexels-photo-2231756.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
        // required: true
    },
    created_date: {
        type: Date,
        default: Date.now,
        // required: true
    },
    songs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Song'
    }],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        // required: true
    },
    album: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Album'
    }],
    cloudinary_id: {
        type: String
    }
}, {
    versionKey: false,
    timestamps: true 
});

export const LikelistModel = mongoose.model('Likelist', schema);