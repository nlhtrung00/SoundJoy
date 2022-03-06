import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    ten_nhac_si: {
        type: String,
        required: true
    },
    and_nhac_si: {
        type: String,
        required: true
    },
    thong_tin_nhac_si: {
        type: String,
        required: true
    },
    luot_quan_tam: {
        type: Number,
        required: true,
        default: 0
    },
}, {
    versionKey: false
});

export const MusicianModel = mongoose.model('Musician', schema);