import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "product name is required"],
  },
  is_featured: {
    type: Boolean,
    default: false,
  },
  is_new_arrival: {
    type: Boolean,
    default: true,
  },
  price: {
    type: Number,
    required: [true, "product price is required"],
    min: 1,
  },
  stock: {
    type: Number,
    required: [true, "stock is required"],
    min: 1,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "category",
    required: [true, "category is required"],
  },
  brand: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "brand",
    required: [true, "brand is required"],
  },
  description: {
    type: String,
  },

  // cover_image
  cover_image: {
    type: {
      path: {
        type: String,
        required: [true, "cover image path is required"],
      },
      public_id: {
        type: String,
        required: [true, "cover image public_id is required"],
      },
    },
    required: [true, "cover image is required"],
  },

  // images
  images: [
    {
      type: {
        path: {
          type: String,
          required: [true, "image is required"],
        },
        public_id: {
          type: String,
          required: [true, "image is required"],
        },
      },
      required: [true, "image is required"],
      min: [3, "atleast 3 images required"],
    },
  ],
});
const Product = mongoose.model("product", productSchema);
export default Product;
