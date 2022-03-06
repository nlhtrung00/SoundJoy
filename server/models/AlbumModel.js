import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    ten_album: {
        type: String,
        // required: true
    },
    anh_album: {
        type: String,
        // required: true
    },
    tong_so_bai_hat: {
        type: Number,
        // required: true,
        default: 0
    },
    luot_thich: {
        type: Number,
        // required: true,
        default: 0
    },
    ngay_chinh_thuc: {
        type: Date,
        // required: true
    },
    the_loai: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    },
}, {
    versionKey: false
});

export const AlbumModel = mongoose.model('Album', schema);