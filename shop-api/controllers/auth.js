import User from "../models/User.js";
import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";

import { createError } from "../routes/error.js";

//----------------------------REGISTER------------------------------------
export const register = async (req, res, next) => {
  const userName = await User.findOne({ username: req.body.username });
  if (userName) {
    return next(createError(404, "Username đã tồn tại!"));
  }
  const userEmail = await User.findOne({ email: req.body.email });
  if (userEmail) {
    return next(createError(404, "Email đã tồn tại!"));
  }
  const newUser = new User({
    ...req.body,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString(),
  });
  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    next(err);
  }
};

//----------------------------LOGIN START------------------------------------
let refreshTokens = [];
const generateAccessToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_SEC,
    { expiresIn: "3d" }
  );
};

const generateRefreshToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_RESEC,
    { expiresIn: "3d" }
  );
};
//Refresh token
export const refresh = (req, res) => {
  //Take the refresh token from user
  const refreshToken = req.body.token;

  // send error if no token or it's invalid
  if (!refreshToken) {
    res.status(401).json("You are not authenticated");
  }
  if (!refreshTokens.includes(refreshToken)) {
    res.status(403).json("Refresh token is invalid");
  }
  jwt.verify(refreshToken, process.env.JWT_RESEC, (err, user) => {
    // if evevy is ok, reate new token , refresh token and send to  user
    refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
    const newAccessToken = generateAccessToken(user);
    const newRefreshToken = generateRefreshToken(user);
    refreshTokens.push(newRefreshToken);

    res.status(200).json({
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    });
  });
};

//----------------------------LOGIN------------------------------------
export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return next(createError(404, "User not found!"));
    }

    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASS_SEC
    );
    const originPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

    if (originPassword !== req.body.password) {
      return next(createError(400, "Wrong password or username!"));
    }

    //Gererate an access token
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    refreshTokens.push(refreshToken);

    const { password, ...others } = user._doc;
    res.status(200).json({ ...others, accessToken, refreshToken });
  } catch (err) {
    next(err);
  }
};

//----------------------------LOGOUT------------------------------------
export const logout = (req, res) => {
  //Clear cookies when user logs out
  const refreshToken = req.body.token;
  refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
  res.status(200).json("Logged out successfully!");
};
