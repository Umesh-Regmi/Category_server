import CustomError from "../../middlewares/userHandler_middleware.js";
import Category from "../models/categoryModel.js";
import { delete_file, upload_file } from "../utils/cloudinaryUtils.js";

// *get all categories
export const getAll = async (req, res, next) => {
  try {
    // query all categories
    const categories = await Category.find({});

    // send response
    res.status(200).json({
      message: "Categories fetch successfully",
      data: categories,
      status: "success",
    });
  } catch (error) {
    next(error);
  }
};

// *get category given user by id
export const getById = async (req, res, next) => {
  try {
    // get category by id - client
    const { id } = req.params;
    // find category by given id
    const categoriesbyid = await Category.findById(id);

    //check if categories not found
    if (!categoriesbyid) {
      throw new CustomError("Categories not found", 404);
    }

    // send response
    res.status(200).json({
      message: "Categoris id fetch successfully",
      data: Categoriesbyid,
      status: "success",
    });
  } catch (error) {
    next(error);
  }
};

// *create categories
export const categoryCreate = async (req, res, next) => {
  try {
    const { category_name, description } = req.body;
    const logo = req.file;

    if (!logo) {
      throw new CustomError("logo is required", 400);
    }
    const category = await Category.findOne({ category_name });
    if (category) {
      throw new CustomError(
        `category with name ${category.category_name} already exists`,
        404
      );
    }
    const new_category = new Category({ category_name, description });
    const { path, public_id } = await upload_file(logo.path);
    new_category.logo = {
      path,
      public_id,
    };

    // save category
    await new_category.save();
    //send response
    res.status(201).json({
      message: "Category created successfully",
      data: new_category,
      status: "success",
    });
  } catch (error) {
    next(error);
  }
};

// *update category
export const updateCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { category_name, description } = req.body;
    const file = req.file;

    // find and update category by id
    const category = await Category.findByIdAndUpdate(
      id,
      { category_name, description },
      { new: true }
    );
    if (!category) {
      throw new CustomError("Category not found", 404);
    }
    if (file) {
      // delete old image
      if (category.logo) {
        await delete_file(category.logo.public_id);
      }
      // upload new image
      const { path, public_id } = await upload_file(file.path);
      category.logo = {
        path,
        public_id,
      };
      await category.save();
    }
    res.status(201).json({
      message: "Category updated successfully",
      data: category,
      status: "success",
    });
  } catch (error) {}
};

// *delete category
export const categoryDelete = async (req, res, next) => {
  try {
    const { id } = req.params;
    const category = await Category.findByIdAndDelete(id);
    if (!category) {
      throw new CustomError("Category not found", 404);
    }
    if (category.logo) {
      await delete_file(category.logo.public_id);
    }
    res.status(200).json({
      message: "Category deleted successfully",
      data: null,
      status: "success",
    });
  } catch (error) {}
};
