import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    content: {
        type: String,
        // required: true
    },
    // commentChild:[{
    //     type:Object
    // }],
    commented_date: {
        type: Date,
        default: Date.now,
        // required: true
    },
    song: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Song'
        // required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
        // required: true
    }
}, {
    versionKey: false,
    timestamps: true 
});

export const CommentModel = mongoose.model('Comment', schema);