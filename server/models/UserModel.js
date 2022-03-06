import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    tai_khoan: {
        type: String,
        // required: true
    },
    mat_khau: {
        type: String,
        // required: true
    },
    ho_ten: {
        type: String,
        // required: true
    },
    ngay_sinh: {
        type: Date,
        // required: true
    },
    dia_chi: {
        type: String,
        // required: true
    },
    so_dien_thoai: {
        type: String,
        // required: true
    },
    la_quan_tri: {
        type: Boolean,
        // required: true,
        default: false
    },
    ngay_dang_ky: {
        type: Date,
        // required: true,
        default: Date.now
    }    
}, {
    versionKey: false,
}); //,{ timestamps: true} => createdAt + updatedAt

export const UserModel = mongoose.model('User', schema);