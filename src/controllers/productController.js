import CustomError from "../../middlewares/userHandler_middleware.js";
import Brand from "../models/brandModel.js";
import Category from "../models/categoryModel.js";
import Product from "../models/productModel.js";
import { upload_file } from "../utils/cloudinaryUtils.js";
import { get_pagination } from "../utils/paginationUtils.js";

// get all products
export const getAllProducts = async (req, res, next) => {
  try {
    const { page, per_page } = req.query;
    const limit = parseInt(per_page) || 10;
    const current_page = parseInt(page) || 1;
    const skip = (current_page - 1) * limit;
    const product = await Product.find({})
      .populate("category")
      .populate("brand")
      .limit(limit)
      .skip(skip);

    const total_documents = await Product.countDocuments({});

    const pagination = get_pagination(total_documents, current_page, limit);

    res.status(200).json({
      message: "Products fetched successfully",
      data: product,
      status: "success",
      pagination,
    });
  } catch (error) {
    next(error);
  }
};

// get by id
export const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      throw new CustomError("Product not found", 404);
    }
    res.status(200).json({
      message: "Product fetched",
      data: product,
      status: success,
    });
  } catch (error) {
    next(error);
  }
};

// create product
export const productCreate = async (req, res, next) => {
  try {
    const {
      name,
      price,
      stock,
      category,
      brand,
      description,
      is_featured,
      is_new_arrival,
    } = req.body;
    const files = req.files;
    const { cover_image, images } = req.files;
    console.log(cover_image);
    if (!category || !brand) {
      throw new CustomError("Category and brand are required", 400);
    }

    const product = new Product({
      name,
      price,
      stock,
      description,
      is_featured,
      is_new_arrival,
    });

    const product_category = await Category.findById(category);
    if (!product_category) {
      throw new CustomError("Category not found", 404);
    }
    const product_brand = await Brand.findById(brand);
    if (!product_brand) {
      throw new CustomError("Brand not found", 404);
    }
    product.category = product_category._id;
    product.brand = product_brand._id;

    // cover_image
    if (cover_image) {
      const { path, public_id } = await upload_file(cover_image[0].path);
      console.log(cover_image);
      product.cover_image = {
        path,
        public_id,
      };
    }

    // images
    if (images) {
      const promises = images.map(async (file) => await upload_file(file.path));
      const product_images = await Promise.all(promises);
      product.images = product_images;
    }

    // save product
    await product.save();
    res.status(200).json({
      message: "Product created successfully",
      data: product,
      status: "success",
    });
  } catch (error) {
    next(error);
  }
};

// update product
export const updateBrand = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;
    const file = req.file;

    // find and update product by id
    const product = await Product.findByIdAndUpdate(
      id,
      { name, description },
      { new: true }
    );
    if (!product) {
      throw new CustomError("Brand not found", 404);
    }
    if (file) {
      // delete old image
      if (product.logo) {
        await delete_file(brand.logo.public_id);
      }
      // upload new image
      const { path, public_id } = await upload_file(file.path);
      product.logo = {
        path,
        public_id,
      };
      await product.save();
    }
    res.status(201).json({
      message: "product updated successfully",
      data: product,
      status: "success",
    });
  } catch (error) {
    next(error);
  }
};

// delete product

// get product by category id
export const getProductByCategory = async (req, res, next) => {
  try {
    const { page, per_page } = req.query;
    const limit = parseInt(per_page) || 10;
    const current_page = parseInt(page) || 1;
    const skip = (current_page - 1) * limit;

    const { id } = req.params;
    const products = await Product.find({ category: id });

    const total_documents = await Product.countDocuments({});

    const pagination = get_pagination(total_documents, current_page, limit);

    res.status(201).json({
      message: "Product fetched",
      data: products,
      status: "success",
      pagination,
    });
  } catch (error) {}
};

// get featured products
export const getFeatured = async (req, res, next) => {
  try {
    const { page, per_page } = req.query;
    const limit = parseInt(per_page) || 10;
    const current_page = parseInt(page) || 1;
    const skip = (current_page - 1) * limit;
    const products = await Product.find({ is_featured: true })
      .populate("category")
      .populate("brand")
      .limit(limit)
      .skip(skip);

    const total_documents = await Product.countDocuments({});

    const pagination = get_pagination(total_documents, current_page, limit);

    res.status(201).json({
      message: "get featured",
      data: products,
      status: "success",
      pagination,
    });
  } catch (error) {
    next(error);
  }
};

// get new arrival products
export const getNewArrival = async (req, res, next) => {
  try {
    const { page, per_page } = req.query;
    const limit = parseInt(per_page) || 10;
    const current_page = parseInt(page) || 1;
    const skip = (current_page - 1) * limit;
    const products = await Product.find({ is_new_arrival: true });

    const total_documents = await Product.countDocuments({});

    const pagination = get_pagination(total_documents, current_page, limit);

    res.status(201).json({
      message: "new arrivals",
      data: products,
      status: "success",
      pagination,
    });
  } catch (error) {
    next(error);
  }
};
