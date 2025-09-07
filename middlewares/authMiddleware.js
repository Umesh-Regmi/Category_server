import User from "../src/models/userModel.js";
import { decode_token } from "../src/utils/jwtUtils.js";
import CustomError from "./userHandler_middleware.js";

export const authenticate = (roles) => {
  return async (req, res, next) => {
    try {
      const token = req.cookies.access_token;
      console.log(token);
      if (!token) {
        throw new CustomError("Access token required", 400);
      }
      // verify token
      const decoded_data = decode_token(token);
      if (!decoded_data) {
        throw new CustomError("Unauthorized, Access denied", 401);
      }
      if (Date.now() > decoded_data.exp * 1000) {
        res
          .clearCookie(access_token, {
            secure: process.env.NODE_ENV ? false : true,
            sameSite: "none",
            httpOnly: true,
          })
          .status(401)
          .json({
            message: "Unauthorized access",
            success: false,
          });
      }
      const user = await User.findById(decoded_data._id);
      if (!user) {
        throw new CustomError("Unauthorized access", 401);
      }

      // rolebased authorization[admin, user]
      if (roles && Array.isArray(roles) && !roles.includes(decoded_data.role)) {
        throw new CustomError(
          "Forbidden, You can not aceess this resource",
          403
        );
      }

      // attach user object on request
      req.user = user;
      next();
    } catch (error) {
      next(error);
    }
  };
};
