import express from "express";
import {
  createProductDetail,
  deleteProductDetail,
  findProductDetail,
  getProductDetail,
  updateProductDetail,
  updateProductDetailQuantity,
} from "../controllers/productDetail.js";
import {
  verifyToken,
  verifyTokenAndAuth,
  verifyTokenAndAdmin,
} from "./verifyToken.js";

const router = express.Router();
//Create
router.post("/:productId", verifyTokenAndAuth, createProductDetail);

//Update
router.put("/:id", verifyTokenAndAdmin, updateProductDetail);
router.put(
  "/quantity/:title",
  verifyTokenAndAdmin,
  updateProductDetailQuantity
);

//Delete
router.delete("/:id/:productId", verifyTokenAndAdmin, deleteProductDetail);

//Get ProductDetail
router.get("/find/:id", findProductDetail);

//Get all productDetail
router.get("/", getProductDetail);

export default router;
