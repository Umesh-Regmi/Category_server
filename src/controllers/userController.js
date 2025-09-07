import CustomError from "../../middlewares/userHandler_middleware.js"
import User from "../models/userModel.js"
import { delete_file, upload_file } from "../utils/cloudinaryUtils.js"


// get user by id

// delete user

// delete user by id


// get all users
export const getAlluser = async(req, res, next) => {
    try {
        const user = await User.find()
        res.status(200).json({
            message: 'All users fetched successfully',
            data: user,
            status: 'success'
        })
    } catch (error) {
        next(error)
    }
}

// get user by id
export const userById = async(req, res, next) => {
    try {
        const {id} = req.params
        const getUserById = await User.findById(id)
        if(!getUserById){
            throw new CustomError('User not found', 404)
        }
        res.status(200).json({
            message: 'User fetched successfully',
            data: getUserById,
            status: 'success'
        })

    } catch (error) {
        next(error)
    }
}

// update user
export const updateUser = async(req, res, next) => {
    try {
        const {id} = req.params
        const {first_name, last_name, email, password, gender, role} = req.body
        const file = req.file

        // find and update user by id
        const user = await User.findByIdAndUpdate(id,{first_name, last_name, email, password, gender, role},{new:true})
        if(!user){
            throw new CustomError('User not found', 404)
        }
        res.status(200).json({
            message: 'User updated successfully',
            data: user,
            status: 'success'
        })

    } catch (error) {
        next(error)
    }
}

// delete user
export const deleteUser = async(req, res, next) => {
    try {
        const {id} = req.params
        const remove = await User.findByIdAndDelete(id)
        if(!remove){
            throw new CustomError('User not deleted', 404)
        }
        res.status(200).json({
            message: 'User deleted successfully',
            data: remove,
            status: 'success'
        })
    } catch (error) {
        next(error)
    }
}


// update profile image
export const update_profile = async(req, res) => {
    try {
        const {id} = req.params
        const {first_name, last_name, gender, phone} = req.body
        const image = req.file
        const user = await User.findById(id)

        if(!user){
            throw new CustomError('user not found', 404)
        }
        if(first_name) user.first_name = first_name
        if(last_name) user.last_name = last_name
        if(gender) user.gender = gender
        if(phone) user.phone = phone

        if(image){
            const {public_id, path} = await upload_file(image.path)
            user.profile_image = {
                profile_id,
                path
            }
        }
// delete old image
if(user.profile_image){
    await delete_file(user.profile_image.public_id)
}

// add new image
if(user.profile_image){
    public_id,
    path
}

        await user.save()
        res.status(201).json({
            message: 'profile updated',
            data: user
        })
    } catch (error) {
        next (error)
        
    }
}
