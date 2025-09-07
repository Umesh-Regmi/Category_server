import mongoose from "mongoose";
import { order_status, payment_method } from "../config/constants.js";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: [true, "User is required"],
    },
    items: [
      {
        type: {
          product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "product",
            required: [true, "Product is required"],
          },
          quantity: {
            type: Number,
            required: [true, "Quantity is required"],
            min: [1, "product must be a positive number"],
          },
          total_price: {
            type: Number,
            required: [true, "Total price is required"],
          },
        },
      },
    ],
    total_amount: {
      type: Number,
      required: [true, "Total amount is required"],
      min: [0, "Total amount must be a positive"],
    },
    shipping_address: {
      type: {
        state: {
          type: String,
          required: [true, "state is required"],
        },
        district: {
          type: String,
          required: [true, "District is required"],
        },
        city: {
          type: String,
          required: [true, "City is required"],
          trim: true,
        },
        street: {
          type: String,
          required: [true, "Street is required"],
          trim: true,
        },
      },
      required: [true, "Shipping address is required"],
    },
    payment_method: {
      type: String,
      enum: Object.values(payment_method),
      default: payment_method.COD,
    },
    status: {
      type: String,
      enum: Object.values(order_status),
      default: order_status.PENDING,
    },
    phone_number: {
      type: String,
      required: [true, "phone number is required"],
      minLengt: [10],
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("order", orderSchema);
export default Order;
