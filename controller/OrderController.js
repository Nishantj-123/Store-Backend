import Order from "../model/Order.js";
import Cart from "../model/Cart.js";

//  CREATE ORDER 
export const createOrder = async (req, res) => {
  try {
    const userId = req.user.id;

    // populate productId from Product model
    const cart = await Cart.findOne({ userId }).populate("items.productId");

    if (!cart || cart.items.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "Cart is empty" });
    }

    let totalAmount = 0;

    const orderItems = cart.items.map((item) => {
      totalAmount += item.productId.price * item.qty;

      return {
        productId: item.productId._id,
        name: item.productId.name,
        price: item.productId.price,
        qty: item.qty,
      };
    });

    const order = await Order.create({
      userId,
      items: orderItems,
      totalAmount,
      paymentStatus: "Pending",
      orderStatus: "Processing",
    });

    // Clear cart after order
    cart.items = [];
    await cart.save();

    res.status(201).json({
      success: true,
      message: "Order Placed Successfully",
      order,
    });
  } catch (error) {
    console.error("Error creating order:", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
};

//  GET LOGGED-IN USER ORDERS
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id }).sort({
      createdAt: -1,
    });

    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error("Error fetching orders:", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
};

//  GET SINGLE ORDER (USER) 
export const getSingleOrder = async (req, res) => {
  try {
    const order = await Order.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    res.status(200).json({ success: true, order });
  } catch (error) {
    console.error("Error fetching order:", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
};

//  ADMIN: GET ALL ORDERS 
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("userId", "name email")
      .populate("items.productId")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error("Error fetching all orders:", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
};

// ADMIN: UPDATE ORDER STATUS 
export const updateOrderStatus = async (req, res) => {
  try {
    const { orderStatus, paymentStatus } = req.body;

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { orderStatus, paymentStatus },
      { new: true }
    );

    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    res.status(200).json({
      success: true,
      message: "Order updated successfully",
      order,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
