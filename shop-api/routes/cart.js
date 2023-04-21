import express from "express";
import {
  createCart,
  deleteCart,
  findCart,
  getCart,
  updateCart,
} from "../controllers/cart.js";
import {
  verifyToken,
  verifyTokenAndAuth,
  verifyTokenAndAdmin,
} from "./verifyToken.js";

const router = express.Router();

//Create
router.post("/", verifyToken, createCart);

//Update
router.put("/:id", verifyTokenAndAuth, updateCart);

//Delete
router.delete("/:id", verifyTokenAndAuth, deleteCart);

//Get User Cart
router.get("/find/:userId", verifyTokenAndAuth, findCart);

//Get all cart
router.get("/", verifyTokenAndAdmin, getCart);

export default router;
