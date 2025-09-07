import CustomError from "../../middlewares/userHandler_middleware.js"
import Wishlist from "../models/wishlistModel.js"

// add to wishlist
export const addWishlist = async(req, res, next) => {
    try {
        const {product_id} = req.body
        const user_id = req.user.user_id
        let wish_list = null

        if(!product_id){
            throw new CustomError('Product id is required', 400)
        }
        const wishlist = await Wishlist.findOne({product: product_id, user: user_id})
        if(!wishlist){
            const wish_list = await Wishlist.create({product:product_id, user:user_id})
            res.status(201).json({
                message: 'Product added to wishlist',
                data: wishlist,
                status: 'success'
            })
        }
        else{
            await wishlist.deleteOne()
            res.status(201).json({
                message: 'Product removed',
                data: wishlist,
                status: 'success'
            })
        }
    } catch (error) {
        next(error)
    }
}


// get wishlist
export const getAll = async(req, res, next) => {
    try {
        const user_id = req.user_id
        const wishList = await Wishlist.find({user: user_id}.populate('user').populate('product'))
    } catch (error) {
        next(error)
    }
}