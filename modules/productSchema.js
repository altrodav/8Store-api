const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    subCategory: {
        type: String,
    },
    assets: [{
        type: {
            type: String,
            enum: ['image', 'video'], // restrict to 'image' or 'video'
            required: true,
        },
        url: {
            type: String,
            required: true,
        }
    }],
    colors: [{
        colorName: {
            type: String,
            required: true,
        },
        colorCode: {
            type: String,
            required: true,
        },
        isAvailable: {
            type: Boolean,
            default: true, // default value if not provided
        }
    }],
    sizes: [{
        sizeName: {
            type: String,
            required: true,
        },
        weightRange: {
            type: String,
            required: true,
        },
        isAvailable: {
            type: Boolean,
            default: true, // default value if not provided
        }
    }],
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
    }
}, { 
    timestamps: true ,
    versionKey: false
});

module.exports = mongoose.model('product', productSchema);