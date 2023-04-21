import express from "express";
import { register, refresh, login, logout } from "../controllers/auth.js";
import {
  verifyToken,
  verifyTokenAndAuth,
  verifyTokenAndAdmin,
} from "./verifyToken.js";

const router = express.Router();
//Register
router.post("/register", register);

//Refresh Token
router.post("/refresh", refresh);

//Login
router.post("/login", login);

//LOGOUT
router.post("/logout", logout);

export default router;
