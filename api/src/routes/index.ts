import express from "express";

import authRoutes from "./auth.route";
import productRoutes from "./product.route";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/product", productRoutes);

export default router;
