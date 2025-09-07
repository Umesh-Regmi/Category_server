import CustomError from "../../middlewares/userHandler_middleware.js";
import Cart from "../models/cartModel.js";
import Product from "../models/productModel.js";

// create cart
export const createCart = async (req, res, next) => {
  try {
    let cart = null;
    const user_id = req.user._id;
    const { product_id, qunatity } = req.body;
    if (!product_id || !qunatity) {
      throw new CustomError("Product id and qunatity are required", 400);
    }
    if (parseInt(qunatity) < 1) {
      throw new CustomError("Qunantity can not be less than 1", 400);
    }
    const product = await Product.findById(product_id);
    if (!product) {
      throw new CustomError("Product not found", 404);
    }
    cart = await Cart.findOne({ user: user_id });
    const total_price = product.price * parseInt(qunatity).toFixed(2);
    if (!cart) {
      cart = new Cart({ user: user_id });
      cart.items.push({
        product: product_id,
        qunatity: parseInt(qunatity),
        total_price: parseFloat(total_price),
      });
      cart.total_amount = total_price;
      await cart.save();
      res.status(201).json({
        message: "Product added to cart",
        data: cart,
        status: "success",
      });
    } else {
      const product_exists = cart.items.filter(
        (item) => item.product.toString() === product_id.toString()
      )[0];
      if (!product_exists) {
        cart.items.push({
          product: product_id,
          qunatity: parseInt(qunatity),
          total_price: parseFloat(total_price),
        });
        cart.total_amount += total_price;
      } else {
        const total_amount =
          cart.total_amount - product_exists.total_price + total_price;
        product_exists.total_price = total_price;
        product_exists.qunatity = parseInt(qunatity);

        cart.total_amount = total_amount;
      }
      await cart.save();
      res.status(200).json({
        message: "Product added to cart",
        data: cart,
        status: "success",
      });
    }
  } catch (error) {
    next(error);
  }
};

// get cart
export const getCart = async (req, res, next) => {
  try {
    const user_id = req.user._id;
    const cart = await Cart.findOne({ user: user_id })
      .populate("user")
      .populate("items.product");

    res.status(200).json({
      message: "Cart fetched",
      data: cart,
      status: "success",
    });
  } catch (error) {
    next(error);
  }
};

// delete product from cart
// export const deleteCartItem = async (req, res, next) => {
//   try {
//     const user_id = req.user._id;
//     const { product_id } = req.body;

//     if (!product_id) {
//       throw new CustomError("Product id is required", 400);
//     }

//     // Find cart
//     let cart = await Cart.findOne({ user: user_id });
//     if (!cart) {
//       throw new CustomError("Cart not found", 404);
//     }

//     // Find product inside cart
//     const productIndex = cart.items.findIndex(
//       (item) => item.product.toString() === product_id.toString()
//     );

//     if (productIndex === -1) {
//       throw new CustomError("Product not found in cart", 404);
//     }

//     // Subtract price from total amount
//     const productToRemove = cart.items[productIndex];
//     cart.total_amount -= productToRemove.total_price;

//     // Remove product
//     cart.items.splice(productIndex, 1);

//     // If cart becomes empty, reset total amount
//     if (cart.items.length === 0) {
//       cart.total_amount = 0;
//     }

//     await cart.save();

//     res.status(200).json({
//       message: "Product removed from cart",
//       data: cart,
//       status: "success",
//     });
//   } catch (error) {
//     next(error);
//   }
// };
export const removeProduct = async (req, res, next) => {
  try {
    const user_id = req.user._id;
    const { product_id } = req.params;

    // find cart using user id
    const cart = await Cart.findOne({ user: user_id });
    if (!cart) {
      throw new CustomError("Cart not created yet", 400);
    }
    const product = cart.items.filter(
      (item) => item.product.toString() === product_id.toString()
    )[0];

    if (!product) {
      throw new CustomError("Product does not exists in cart", 404);
    }
    cart.total_amount -= product.total_price;
    await cart.save();
    res.status(200).json({
      message: "Product removed successfully",
      data: null,
      status: success,
    });
  } catch (error) {
    next(error);
  }
};

// delete cart
export const deletecart = async (req, res, next) => {
  try {
    const user = req.user._id;

    const cart = await Cart.findOne({ user });
    if (!cart) {
      throw new CustomError("Cart not found", 404);
    }
    cart.items = [];
    await cart.save();
    res.status(200).json({
      message: "Cart deleted successfully",
      data: null,
      status: success,
    });
  } catch (error) {
    next(error);
  }
};

// update cart
