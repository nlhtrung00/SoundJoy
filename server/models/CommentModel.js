import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    noi_dung: {
        type: String,
        // required: true
    },
    ngay_binh_luan: {
        type: Date,
        // required: true
    },
    bai_hat: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Song'
        // required: true
    },
    nguoi_dung: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
        // required: true
    }
}, {
    versionKey: false
});

export const CommentModel = mongoose.model('Comment', schema);