import multer from "multer"
import fs from 'fs'
import path from 'path'
import CustomError from "./userHandler_middleware.js"

export const uploader = (folder='/') => {
    const upload_path = 'uploads' + folder
    const size_limit = 5 *1024 * 1024

    const allowed_extension = ['png', 'jpg', 'jpeg', 'webp', 'svg']

    const myStorage = multer.diskStorage({
        destination:(req, file, cb)=>{
            if(!fs.existsSync(upload_path)){
                fs.mkdirSync(upload_path,{recursive:true})
            }
            cb(null, upload_path)
        },
        filename:(req, file, cb)=>{
            const file_name = Date.now() + '-' + file.originalname
            cb(null, file.originalname)
        }
    })
    const fileFilter = (req, file, cb) => {
        const file_ext_name = path.extname(file.originalname).replace('.', '')
        const is_allowed_ext = allowed_extension.includes(file_ext_name)
        if(is_allowed_ext){
            cb(null, true)
        }
        else{
            const error = new CustomError(`file Format ${file_ext_name} not allowed only ${allowed_extension.join(',')} are allowed format.`, 400)
        }
    }
    
    const upload = multer({storage: myStorage, limits:{fileSize: size_limit}, fileFilter})
    return upload
}