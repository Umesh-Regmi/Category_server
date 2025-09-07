import mongoose from "mongoose";
const cartSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: [true, 'User is required']
    },
    product:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product',
        required: [true, 'Product is required']
    },
},{timeseries:true})

const Wishlist =  mongoose.model('wish_list', cartSchema)
export default Wishlist