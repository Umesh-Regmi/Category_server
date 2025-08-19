import mongoose from "mongoose"
import { mongodbConfig } from "./config.js"

export const mongodb_conn = () => {
    mongoose.connect(mongodbConfig.url,{
        dbName: mongodbConfig.dbname,
        autoCreate:true
    }).then(()=>{
        console.log("Database connected successfully")
    })
    .catch((error)=>{
        console.log("Database connection failed")
        console.log(error)
    })
}