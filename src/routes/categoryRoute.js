import express from "express";
import {
  categoryCreate,
  categoryDelete,
  getAll,
  getById,
  updateCategory,
} from "../controllers/categoryController.js";
import { uploader } from "../../middlewares/uploaderMiddleware.js";
import { authenticate } from "../../middlewares/authMiddleware.js";
import { Role } from "../config/constants.js";
const router = express.Router();
const upload = uploader();

// create category
// endpoint: api/category
router.post(
  "/",
  authenticate([Role.ADMIN]),
  upload.single("logo"),
  categoryCreate
);
// update category
// endpoint: api/category/id
router.put(
  "/:id",
  authenticate([Role.ADMIN]),
  upload.single("logo"),
  updateCategory
);
// get all
// endpoint api/category
router.get("/", getAll);
//get by id
router.get("/getbyid", getById);

// delete category by id
router.delete("/:id", authenticate([Role.ADMIN]), categoryDelete);
export default router;
