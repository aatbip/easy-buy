import express from "express";

const router = express.Router();

import {
  addNewProduct,
  getAdminProduct,
  getAllProducts,
  getProductById,
} from "../controllers/productController";
import { isHost } from "../middleware/auth";
import { sessionVerification } from "../middleware/sessionVerification";
import { uploader } from "../middleware/uploader";

router.post("/", sessionVerification, isHost, uploader, addNewProduct);
router.get("/", sessionVerification, isHost, getAdminProduct);
router.get("/all", getAllProducts);
router.get("/:id", getProductById);

export default router;
