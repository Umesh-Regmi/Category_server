import express from "express";
import {
  cancelOrder,
  changeStatus,
  createOrder,
  deleteOrder,
  getAllOrders,
  getAllUsersOrders,
  getOrdersById,
} from "../controllers/orderController.js";
import { authenticate } from "../../middlewares/authMiddleware.js";
import { Role } from "../config/constants.js";
const router = express.Router();

router.post("/", authenticate([Role.USER]), createOrder);
router.get("/:id", authenticate([Role.ADMIN]), getAllOrders);
router.get("/", authenticate([Role.ADMIN]), getOrdersById);
router.put('/"id', authenticate([Role.ADMIN]), changeStatus);
router.put("/cancel/:id", authenticate([Role.USER]), cancelOrder);
router.get("/user", authenticate([Role.ADMIN]), getAllUsersOrders);
router.delete("/:id", authenticate([Role.ADMIN]), deleteOrder);

export default router;
