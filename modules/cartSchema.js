const cartSchema = new mongoose.Schema({
    userId: { type: "String", required: true },
    items: [
        {
        productId: { type: String },
        quantity: { type: Number, required: true },
        size: String,
        color: String,
        }
    ],
    totalItems: { type: Number, default: 0 },
    totalPrice: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now }
    });
    module.exports = mongoose.model('Cart', cartSchema);