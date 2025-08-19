import CustomError from "../../middlewares/userHandler_middleware.js"
import path from 'path'
import cloudinary from "../config/cloudinaryConfig.js"
import fs from 'fs'
// upload file to cloud
export const upload_file = async(file, folder='/') => {
    try {
        const folder_name = path.join('/team-5-db', folder)
        const {public_id, secure_url} = await cloudinary.uploader.upload(file,{
            unique_filename: true,
            folder: folder_name
        })
        if(fs.existsSync(file)){
            fs.unlinkSync(file)
        }
        return{
            public_id,
            path: secure_url
        }

    } catch (error) {
        console.log("file upload error")
        throw new CustomError("file upload error")
    }
}