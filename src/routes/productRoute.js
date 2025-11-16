import express from "express";
import {
  getAllProducts,
  getNewArrival,
  productCreate,
} from "../controllers/productController.js";
import { uploader } from "../../middlewares/uploaderMiddleware.js";
const router = express.Router();
const upload = uploader();

router.get("/", getAllProducts);
router.post(
  "/",
  upload.fields([
    { name: "cover_image", maxCount: 1 },
    { name: "images", maxCount: 6 },
  ]),
  productCreate
);
router.get("/newarrival", getNewArrival);

export default router;
