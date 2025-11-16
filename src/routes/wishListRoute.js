import express from "express";
import { addWishlist, getAll } from "../controllers/wishListController.js";
import { authenticate } from "../../middlewares/authMiddleware.js";
import { Role } from "../config/constants.js";
const router = express.Router();

router.post("/", authenticate([Role.USER]), addWishlist);
router.get("/wish", authenticate([Role.USER], getAll));

export default router;
