import mongoose from "mongoose";
const wishListSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: [true, "User is required"],
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
      required: [true, "Product is required"],
    },
  },
  { timeseries: true }
);

const Wishlist = mongoose.model("wish_list", wishListSchema);
export default Wishlist;
