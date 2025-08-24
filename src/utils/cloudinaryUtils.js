import CustomError from "../../middlewares/userHandler_middleware.js"
import path from 'path'
import cloudinary from "../config/cloudinaryConfig.js"
import fs from 'fs'
// upload file to cloud
export const upload_file = async(file, folder='/') => {
    try {
        const folder_name = 'team-5-db' + folder
        console.log(folder_name)
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
        console.log(error)
        throw new CustomError("file upload error")
    }
}

// delete file
export const delete_file = async(public_id) => {
    try {
        await cloudinary.uploader.destroy(public_id)
        return true
    } catch (error) {
        throw new CustomError('file deleting error', 404)
    }
}