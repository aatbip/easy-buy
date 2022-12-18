import express, { Response, Request, NextFunction } from "express";

import { register, signIn, signOut } from "../controllers/authController";
import {
  checkIfTokenExpired,
  sessionVerification,
} from "../middleware/sessionVerification";

const router = express.Router();

router.post("/register", register);
router.post("/signin", signIn);
router.post("/signout", signOut);
router.get("/verifysession", sessionVerification, checkIfTokenExpired);

export default router;
