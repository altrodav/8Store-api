const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
    phone: { 
        type: String, 
        required: true 
    },
    otp: { 
        type: String, 
        required: true 
    },
    expiresAt: { 
        type: Date, 
        required: true 
    }
}, {
    timestamps: true, 
    versionKey: false
});

module.exports = mongoose.model('Otp', otpSchema);
