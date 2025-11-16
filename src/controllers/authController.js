import CustomError from "../../middlewares/userHandler_middleware.js";
import User from "../models/userModel.js";
import { comparePassword, hash_password } from "../utils/bcryptUtils.js";
import { upload_file } from "../utils/cloudinaryUtils.js";
import {
  passwordChangedEmail,
  sendAccountRegisteredEmail,
} from "../utils/email_functionsUtils.js";
import { sendEmail } from "../utils/emailUtils.js";
import { generateWebToken } from "../utils/jwtUtils.js";

// *register user

// @body({email,password,first_name , last_name, phone})

const users = [];

export const Register = async (req, res, next) => {
  try {
    // register user

    // console.log(req.body);
    // // get data from user
    const { email, password, first_name, last_name, phone, gender } = req.body;
    const image = req.file;

    if (!email) {
      // throw new ("email is required");
      throw new CustomError("Email is required", 400);
    }

    if (!password) {
      throw new Error("password is required");
    }

    if (!first_name || !last_name) {
      throw new Error("first_name and last_name is required");
    }
    const hash_pass = await hash_password(password);

    const user = await User.create({
      email,
      password: hash_pass,
      first_name,
      last_name,
      phone,
      gender,
    });

    if (image) {
      const { path, public_id } = await upload_file(image.path);
      user.profile_image = {
        path,
        public_id,
      };
    }
    await user.save();
    await sendAccountRegisteredEmail(user);
    // await sendEmail({to:user.email, subject:'Account register', html:'<h2>Account created</h2>'})

    res.status(201).json({
      message: "account created successfully",
      status: "success",
      data: user,
    });
  } catch (error) {
    // res.status(500).json({
    //   message: error?.message || "something went wrong",
    //   status: "error",
    // });
    next(error);
  }
};

// *login user
export const Login = async (req, res, next) => {
  try {
    // register user logic

    //*   1. get email & password from req body
    const { email, password } = req.body;
    console.log(req.body);

    //* 2. search users array to find user by email

    // const user = users.find((value) => value.email === email);
    const user = await User.findOne({ email: email }).select("+password");

    //* 3. if user do not exists throw error message

    if (!user) {
      throw new Error("invalid email or password.....");
    }

    //* 4. compare password

    // const isPassMatch = user.password === password;
    const isPassMatch = await comparePassword(password, user.password);

    //* 5. password does not matched throw error
    if (!isPassMatch) {
      throw new Error("invalid email or password");
    }
    //* all ok ->
    // generate jwt token
    // const payload = {
    //   _id: user._id,
    //   first_name: user.first_name,
    //   last_name: user.last_name,
    //   email: user.email
    // }
    const access_token = generateWebToken({
      _id: user._id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      role: user.role,
    });

    res
      .cookie("access_token", access_token, {
        secure: process.env.NODE_ENV === "development" ? false : true,
        sameSite: "none",
        httpOnly: true,
        maxAge: Number(process.env.COOKIE_EXPIRES_IN || 7) * 24 * 60 * 60 * 100,
      })
      .status(201)
      .json({
        message: "logged in successfully",
        status: "success",
        data: {
          user,
          access_token,
        },
      });
  } catch (error) {
    res.status(500).json({
      message: error.message || "something went wrong",
    });
  }
};
// *change password
export const changePassword = async () => {
  try {
    const { old_password, new_password, email } = req.body;
    if (!old_password) {
      throw new Error("Old password is required");
    }
    // search user
    const user = User.findOne({ email }).select("+password");
    if (!user) {
      throw new Error("User not found");
    }
    const is_pass_match = await comparePassword(old_password, user.password);
    if (!is_pass_match) {
      throw new Error("Password does not match");
    }

    // hash new password
    const hashed_pass = await hash_password(new_password);
    user.password = hashed_pass;
    await user.save();
    await passwordChangedEmail(user);
    res.status(200).json({
      message: "Password updated successfully",
      status: "success",
    });
  } catch (error) {
    // res.status(500).json({
    //   message: error.message || "Something went wrong",
    //   status: 'error'
    // })
    next({
      message: error.message || "Something went wrong",
      status: "error",
    });
  }
};

// *logout
export const Logout = async (req, res, next) => {
  try {
    res
      .clearCookie("access_token", {
        secure: process.env.NODE_ENV === "development" ? false : true,
        sameSite: "none",
        httpOnly: true,
      })
      .status(200)
      .json({
        message: "Logout successfully",
        data: null,
        status: "success",
      });
  } catch (error) {
    next(error);
  }
};

// *get profile image
export const me = async (req, res, next) => {
  const id = req.user._id;
  const user = await User.findById(id);

  if (!user) {
    throw new CustomError("User not found", 404);
  }
  res.status(200).json({
    message: "Profile fetched",
    data: user,
    status: "successs",
  });
};
