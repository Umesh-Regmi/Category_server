// name, description, logo
import mongoose  from "mongoose";

 const categorySchema = new mongoose.Schema({
    category_name:{
        type: String,
        required: [true, 'name is required'],
        unique: [true, 'unique name is required'],
        trim: true
    },
    description: {
        type: String,
    required: true
     },
    logo:{
        path:{
            type:String,
            required: [true, 'Logo path is required']
        },
    public_id:{
        type: String,
        required: [true, 'logo path is required']
    }
}
},{timestamps:true})
const Category = mongoose.model("category", categorySchema)
export default Category