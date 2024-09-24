const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId, // Reference to the User collection
      ref: "User",
      required: true,
    },
    productId: {
      type: String, // Reference to the Product collection
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1, // Ensure the quantity is at least 1
      default: 1,
    },
    size: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    shortDiscription: {
      type: String,
      required: true,
    },
    isDelivered: {
      type: Boolean,
      default: false, // Order is incomplete by default
    },
    isPaymentDone: {
      type: Boolean,
      default: false, // Payment is not done by default
    },
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model('Order', orderSchema);
