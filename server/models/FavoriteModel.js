import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    ten_danh_sach: {
        type: String,
        // required: true
    },
    ngay_tao: {
        type: Date,
        // required: true
    },
    bai_hat: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Song'
    }],
    nguoi_dung: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        // required: true
    },
    album: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Album'
    }]
}, {
    versionKey: false
});

export const FavoriteModel = mongoose.model('Favorite', schema);