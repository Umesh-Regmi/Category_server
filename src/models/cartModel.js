import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
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
  },
  { timestamps: true }
);

const Cart = mongoose.model("cart", cartSchema);
export default Cart;
