import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    ten_the_loai: {
        type: String,
        required: true
    },
    anh_the_loai: {
        type: String,
        required: true
    }
},{
    versionKey: false
});

export const CategoryModel = mongoose.model('Category', schema);