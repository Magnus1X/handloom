import Order from '../models/order.model.js';

export const createOrder = async (req, res) => {
  try {
    const { items, shippingAddress, totalAmount } = req.body;

    if (!items || !items.length) {
      return res.status(400).json({ message: 'Order items are required' });
    }

    if (!shippingAddress || !totalAmount) {
      return res.status(400).json({ message: 'Shipping address and total amount are required' });
    }

    const order = new Order({
      userId: req.user._id,
      items,
      shippingAddress,
      totalAmount,
      paymentMethod: 'COD',
      status: 'Placed'
    });

    await order.save();

    res.status(201).json({
      message: 'Order placed successfully',
      order
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findOne({ _id: id, userId: req.user._id });

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};