// mongoose model for user

import mongoose from "mongoose";
import { Gender, Role } from "../config/constants.js";

// schema 
const userSchema = new mongoose.Schema({
  first_name:{
    type:String,
    trim:true,
    required:[true,'first name is required']
  },
  last_name:{
    type:String,
    trim:true,
    required:[true,'last name is required']
  },
  email:{
    type:String,
    trim:true,
    required:[true,'email is required'],
    unique:[true,'user already exists with provied email']
  },
    password:{
    type:String,
    required:[true,'password is required'],
    minLength:[6,'password must be 6 char long'],
    Selection: false
  },
  profile_image:{
    path: String,
  },
  public_id:{
    type:String
  },
    phone:{
    type:String,
    trim:true,
  },
  role:{
    type: String,
    enum: Object.values(Role),
    default: Role.USER
  },
  gender:{
    type: String,
    enum: Object.values(Gender),
    default: Gender.MALE
  }

},{timestamps:true})

// * creating mongoose model for user collection
const User = mongoose.model('user',userSchema);
export default User;