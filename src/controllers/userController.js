import User from "../models/userModel.js"

// add user
export const adduser = async(req, res, next) => {
    const adduser = await User.create()
    const {first_name, last_name, email, password, phone, role} = req.body
    if(!adduser){
        return res.status(400).json({message: "Something went wrong"})
    }
    // res.status(201).json({
    //     message: 'Get all users',
    //     status: 'success',
    //     data: {}
    // })
    next({
    message: error.message || "Something went wrong",
    status: 'error'
    })
}

// get all users
export const getAlluser = async(req, res, next) => {
    const getAllUser = await User.find()
    // res.status(201).json({
    //     message: 'Get all users',
    //     status: 'success',
    //     data: {}
    // })
    next({
    message: error.message || "Something went wrong",
    status: 'error'
    })
}

// get user by id
export const getUserById = async(req, res, next) => {
    // res.status(201).json({
    //     message: 'Get users by id',
    //     status: 'success',
    //     data: {}
    // })
    next({
    message: error.message || "Something went wrong",
    status: 'error'
    })
}

// delete user
export const deleteUser = async(req, res, next) => {
    // res.status(201).json({
    //     message: 'Delete user',
    //     status: 'success',
    //     data: {}
    // })
    next({
    message: error.message || "Something went wrong",
    status: 'error'
    })
}