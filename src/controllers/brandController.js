import CustomError from "../../middlewares/userHandler_middleware.js"
import Brand from "../models/brandModel.js"
import { delete_file, upload_file } from "../utils/cloudinaryUtils.js"

// get all brands
export const getAll = async(req, res, next) => {
  try {
    // query all brands
    const brand = await Brand.find({})

    // send response
    res.status(200).json({
      message: 'Brand fetch successfully',
      data: brand,
      status: 'success'
    })
  } catch (error) {
    next(error)
  }
}

// get brand given user by id
export const getById = async(req, res, next) => {
  try {
    // get brand by id - client
    const {id} = req.params
    // find brand by given id
    const brandbyid = await Brand.findById(id)

    //check if brands not found
    if(!brandbyid){
      throw new CustomError("brands not found", 404)
    }

    // send response
    res.status(200).json({
      message: 'brand id fetch successfully',
      data: brandbyid,
      status: 'success'
    })
  } catch (error) {
    next(error)
  }
}

// create brands
export const createBrand = async(req, res, next) => {
   try {
    const {brand_name, description } = req.body
    const logo = req.file

    if(!logo){
      throw new CustomError("logo is required", 400)
    }
    const brand = await Brand.findOne({brand_name})
    if(brand){
      throw new CustomError(`brand with name ${brand.brand_name} already exists`, 404)
    }
    const new_brand = new Brand({brand_name, description})
    const {path, public_id} = await upload_file(logo.path)
    new_brand.logo = {
      path,
      public_id
    }

    // save brand
    await new_brand.save()
    //send response
    res.status(201).json({
      message: 'Brand created successfully',
      data: new_brand,
      status: 'success'
    })
   } catch (error) {
    next(error)
   }
}

// update brand
export const updateBrand = async(req, res, next) => {
  try {
    const {id} = req.params
    const {brand_name, description} = req.body
    const file = req.file


    // find and update brand by id
    const brand = await Brand.findByIdAndUpdate(id, {brand_name, description},{new:true})
    if(!brand){
      throw new CustomError("Brand not found", 404)
    }
    if(file){
      // delete old image
      if(brand.logo){
        await delete_file(brand.logo.public_id)
      }
      // upload new image
      const {path, public_id} = await upload_file(file.path)
      brand.logo = {
        path,
        public_id
      }
      await brand.save()
    }
    res.status(201).json({
      message: 'Brand updated successfully',
      data: brand,
      status: 'success'
    })
  } catch (error) {
    next(error)
  }
}

// delete brand
export const deleteBrand = async(req, res, next) => {
  try {
    const {id} = req.params
    const brand = await Brand.findByIdAndDelete(id)
    if(!brand){
      throw new CustomError("Brand not found", 404)
    }
    if(brand.logo){
      await delete_file(brand.logo.public_id)
    }    
    res.status(200).json({
      message:'Brand deleted successfully',
      data: null,
      status: 'success'
    })
  } catch (error) {
    
  }
}