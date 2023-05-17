import express from "express";
import {
  deleteUser,
  findUser,
  getUser,
  getUserStats,
  updateUser,
  createUser,
} from "../controllers/user.js";
import {
  verifyToken,
  verifyTokenAndAuth,
  verifyTokenAndAdmin,
} from "./verifyToken.js";

const router = express.Router();

router.post("/", verifyTokenAndAuth, createUser);

//Update
router.put("/:id", verifyTokenAndAuth, updateUser);

//Delete
router.delete("/:id", verifyTokenAndAuth, deleteUser);

//Get user
router.get("/find/:id", findUser);

//Get users
router.get("/", verifyTokenAndAdmin, getUser);

//Get user stats
router.get("/stats", verifyTokenAndAdmin, getUserStats);

export default router;
