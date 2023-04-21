import express from "express";
import {
  createProduct,
  deleteProduct,
  findProduct,
  getProduct,
  getProductDetail,
  searchProduct,
  updateProduct,
} from "../controllers/product.js";
import {
  verifyToken,
  verifyTokenAndAuth,
  verifyTokenAndAdmin,
} from "./verifyToken.js";

const router = express.Router();
//Create
router.post("/", verifyTokenAndAuth, createProduct);

//Update
router.put("/:id", verifyTokenAndAdmin, updateProduct);

//Delete
router.delete("/:id", verifyTokenAndAdmin, deleteProduct);

//Get Product
router.get("/find/:id", findProduct);

//Get all product
router.get("/", getProduct);

//Search
router.get("/search", searchProduct);

router.get("/details/:id", getProductDetail);

export default router;
