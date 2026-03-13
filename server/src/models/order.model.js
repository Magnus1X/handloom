import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [{
    productId: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: 1
    },
    imageUrl: String
  }],
  shippingAddress: {
    name: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    },
    street: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    state: {
      type: String,
      required: true
    },
    pincode: {
      type: String,
      required: true
    }
  },
  totalAmount: {
    type: Number,
    required: true
  },
  paymentMethod: {
    type: String,
    default: 'COD'
  },
  paymentStatus: {
    type: String,
    default: 'Pending',
    enum: ['Pending', 'Paid', 'Refunded', 'Failed']
  },
  status: {
    type: String,
    default: 'Order Placed',
    enum: ['Order Placed', 'Processing', 'Shipping', 'Out for Delivery', 'Delivered', 'Cancelled']
  },
  customerNote: {
    type: String,
    default: ''
  },
  adminNotes: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

export default mongoose.model('Order', orderSchema);