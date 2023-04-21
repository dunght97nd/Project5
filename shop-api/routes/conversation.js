import express from "express";
import {
  createConversation,
  getConversation,
  getSingleConversation,
  updateConversation,
} from "../controllers/conversation.js";
import {
  verifyToken,
  verifyTokenAndAuth,
  verifyTokenAndAdmin,
} from "./verifyToken.js";

const router = express.Router();

router.get("/", verifyToken, getConversation);
router.post("/", verifyToken, createConversation);
router.get("/single/:id", verifyToken, getSingleConversation);
router.put("/:id", verifyToken, updateConversation);

export default router;
