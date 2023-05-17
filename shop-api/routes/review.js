import express from "express";
import {
  verifyToken,
  verifyTokenAndAuth,
  verifyTokenAndAdmin,
} from "./verifyToken.js";
import {
  createReview,
  getReviews,
  deleteReview,
} from "../controllers/review.js";
const router = express.Router();

router.post("/:id", verifyTokenAndAuth, createReview);
router.get("/:productId", getReviews);
router.delete("/:id", deleteReview);

export default router;
