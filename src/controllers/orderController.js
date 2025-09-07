import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";
import CustomError from "../../middlewares/userHandler_middleware.js";
import Cart from "../models/cartModel.js";
import { order_status } from "../config/constants.js";

// *create order
export const createOrder = async (req, res, next) => {
  try {
    const user_id = req.user._id;
    const { items, shipping_address, payment_method, phone_number } = req.body;

    if (!items) {
      throw new CustomError("Items is required", 400);
    }
    if (!shipping_address) {
      throw new CustomError("shipping address is requird", 400);
    }
    const parsed_address = JSON.parse(shipping_address);
    const parsed_items = JSON.parse(items);

    const order = new Order({
      user_id,
      phone_number,
      payment_method,
      shipping_address: parsed_address,
    });
    const order_items = parsed_items.map(async (item) => {
      const is_product_exists = await Product.findById(item.product);
      if (!is_product_exists) {
        return null;
      }

      return {
        product: is_product_exists._id,
        quantity: parseInt(item / quantity),
        total_price: (
          parseInt(item.quantity) * is_product_exists.price
        ).toFixed(2),
      };
    });

    const filtered_items = order_items.filter((item) => item !== null);

    const total_amount = filtered_items.reduce((acc, item) => {
      return (acc += parseFloat(item, total_price));
    }, 0);

    order.items = filtered_items;
    order.total_amount = total_amount;

    // delete cart
    await Cart.deleteOne({ user_id });

    res.status(200).json({
      message: "Order placed successfully",
      status: "success",
      data: order,
    });
  } catch (error) {
    next(error);
  }
};

// *get all order(admin)
export const getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({});
    res.status(200).json({
      message: "All orders fetched",
      data: orders,
      status: "success",
    });
  } catch (error) {
    next(error);
  }
};

// *get order by id
export const getOrdersById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id)
      .populate("user")
      .populate("items.product");

    if (!order) {
      throw new CustomError("Order not found");
    }
    res.status(200).json({
      message: "Orders fetched",
      data: order,
      status: "success",
    });
  } catch (error) {
    next(error);
  }
};

// *change status
export const changeStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const order = await Order.findByIdAndUpdate(id, { status }, { new: true });
    if (!order) {
      throw new CustomError("Order not found", 404);
    }
    res.status(200).json({
      message: "Order status changed",
      data: order,
      status: "success",
    });
  } catch (error) {
    next(error);
  }
};

// *cancel order(user)
export const cancelOrder = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = req.user._id;
    const order = await Order.findByIdAndUpdate(
      { id: _id, user },
      { status: order_status.CANCELED },
      { new: true }
    );
    if (!order) {
      throw new CustomError("Order not found", 404);
    }
    res.status(200).json({
      message: "Order canceled",
      data: order,
      status: "success",
    });
  } catch (error) {
    next(error);
  }
};

// *get all users order(user)
export const getAllUsersOrders = async (req, res, next) => {
  try {
    const user = req.user._id;
    const orders = await Order.find({ user });
    res.status(200).json({
      message: "All orders fetched",
      data: orders,
      status: "success",
    });
  } catch (error) {
    next(error);
  }
};

// *delete order(admin)
export const deleteOrder = async (req, res, next) => {
  try {
    const id = req.params;
    const order = await Order.findByIdAndDelete(id);

    if (!order) {
      throw new CustomError("Order not found", 404);
    }
    res.status(200).json({
      message: "Order deleted",
      data: order,
      status: "success",
    });
  } catch (error) {
    next(error);
  }
};
