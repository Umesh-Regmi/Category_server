import express from "express";
import { Login, Logout, me, Register } from "../controllers/authController.js";
import { uploader } from "../../middlewares/uploaderMiddleware.js";
import { authenticate } from "../../middlewares/authMiddleware.js";
import { Role } from "../config/constants.js";

const upload = uploader();
const router = express.Router();

router.post("/register", upload.single("profile_image"), Register);
router.post("/login", Login);
router.post("/logout", Logout);

// auth check/me
router.get("/me", authenticate([Role.ADMIN, Role.USER]), me);

export default router;
