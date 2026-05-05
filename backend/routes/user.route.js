import express from "express";
import {
  createVerification,
  getVerificationForm,
  submitReview,
} from "../controllers/user.controller.js";
import { protectedRoutes } from "../middleware/protectedRoutes.js";

const router = express.Router();

router.post("/reviews/:id", protectedRoutes, submitReview);
router.post("/verify", protectedRoutes, createVerification);
router.get("/verification-form", protectedRoutes, getVerificationForm);

export default router;
