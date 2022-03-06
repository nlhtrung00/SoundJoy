import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    ten_bai_hat: {
        type: String,
        // required: true
    },
    anh_bai_hat: {
        type: String,
        // required: true
    },
    luot_nghe: {
        type: Number,
        default: 0,
        // required: true
    },
    ngay_chinh_thuc: {
        type: Date,
        // required: true
    },
    the_loai: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        // required: true
    },
    nhac_si: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Musician'
    }],
    ca_si: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Singer'
    }],
    album: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Album'
    },
    link_mp3: {
        type: String,
        // required: true
    }
},{
    versionKey: false
});

export const SongModel = mongoose.model('Song', schema);