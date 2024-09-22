const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId, // Reference to the User collection
        ref: 'User',
        required: true
    },
    products: [{
        type: Schema.Types.ObjectId, // Array of Product references
        ref: 'Product',
        required: true
    }],
    orderAmount: {
        type: Number,
        required: true,
    },
    isCompleted: {
        type: Boolean,
        default: false, // Order is incomplete by default
    },
    isPaymentDone: {
        type: Boolean,
        default: false, // Payment is not done by default
    }
}, { timestamps: true, versionKey: false });

module.exports = mongoose.model('Order', orderSchema);
