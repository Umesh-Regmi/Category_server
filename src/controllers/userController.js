import CustomError from "../../middlewares/userHandler_middleware.js"
import User from "../models/userModel.js"
import { delete_file, upload_file } from "../utils/cloudinaryUtils.js"

// get all user

// get user by id

// delete user

// delete user by id


// get all users
// export const getAlluser = async(req, res, next) => {
//     const getAllUser = await User.find()
//     res.status(201).json({
//         message: 'Get all users',
//         status: 'success',
//         data: {}
//     })
//     next({
//     message: error.message || "Something went wrong",
//     status: 'error'
//     })
// }

// // get user by id
// export const getUserById = async(req, res, next) => {
//     // res.status(201).json({
//     //     message: 'Get users by id',
//     //     status: 'success',
//     //     data: {}
//     // })
//     next({
//     message: error.message || "Something went wrong",
//     status: 'error'
//     })
// }

// // delete user
// export const deleteUser = async(req, res, next) => {
//     // res.status(201).json({
//     //     message: 'Delete user',
//     //     status: 'success',
//     //     data: {}
//     // })
//     next({
//     message: error.message || "Something went wrong",
//     status: 'error'
//     })
// }
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
