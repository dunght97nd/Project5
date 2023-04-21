import express from "express";

import {
  createOrder,
  deleteOrder,
  findOrder,
  getOrder,
  getOrderDaily,
  getOrderInCome,
  getOrderMonthly,
  getOrderStats,
  updateOrder,
} from "../controllers/order.js";

import {
  verifyToken,
  verifyTokenAndAuth,
  verifyTokenAndAdmin,
} from "./verifyToken.js";

const router = express.Router();

//Create
router.post("/", verifyToken, createOrder);

//Update
router.put("/:id", verifyTokenAndAdmin, updateOrder);

//Delete
router.delete("/:id", verifyTokenAndAdmin, deleteOrder);

//Get User Orders
router.get("/find/:id", verifyTokenAndAuth, findOrder);

//Get all Order
router.get("/", verifyTokenAndAdmin, getOrder);

//Get Monthly Order
router.get("/income", verifyTokenAndAdmin, getOrderInCome);
router.get("/daily", verifyTokenAndAdmin, getOrderDaily);
router.get("/monthly", verifyTokenAndAdmin, getOrderMonthly);

router.get("/stats", verifyTokenAndAdmin, getOrderStats);

export default router;
