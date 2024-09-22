const orderSchema = new mongoose.Schema({
    userId: { 
        type: String, 
        required: true 
    },
    productId:{
        type: String,
        required: true,
    },
    totalPrice: { type: Number, required: true },
    status: {
    type: String,
    enum: ['Received', 'Packing', 'Shipped', 'Delivered', 'Canceled'],
    default: 'Received'
    },
    deliveryMethod: { 
        type: String, 
        enum: ['Pickup', 'Delivery'], 
        required: true
    },
    orderNumber: { type: String, unique: true },
    createdAt: { type: Date, default: Date.now },
    });

    module.exports = mongoose.model('Order', orderSchema);