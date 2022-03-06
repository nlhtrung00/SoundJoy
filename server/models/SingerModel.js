import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    ten_ca_si: {
        type: String,
        required: true
    },
    and_ca_si: {
        type: String,
        required: true
    },
    thong_tin_ca_si: {
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

export const SingerModel = mongoose.model('Singer', schema);