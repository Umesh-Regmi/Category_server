import express from "express";
import { authenticate } from "../../middlewares/authMiddleware.js";
import { Role } from "../config/constants.js";
import {
  createCart,
  deletecart,
  getCart,
  removeProduct,
} from "../controllers/cartController.js";
const router = express.Router();

router.get("/", authenticate([Role.USER]), getCart);
router.post("/", authenticate([Role.USER]), createCart);
router.get("/clear", authenticate([Role.USER], deletecart));
router.put("/:product_id", authenticate([Role.USER], removeProduct));

export default router;
