import express from "express";
import mongoose from "mongoose";
import authRouter from "./routes/auth.js";
import userRouter from "./routes/user.js";
import productRouter from "./routes/product.js";
import productDetailRouter from "./routes/productDetail.js";
import cartRouter from "./routes/cart.js";
import orderRouter from "./routes/order.js";
import reviewRouter from "./routes/review.js";
import conversationRoute from "./routes/conversation.js";
import messageRoute from "./routes/message.js";

import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

const app = express();
dotenv.config();
//Connect db
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connect success"))
  .catch((err) => {
    console.log(err);
  });

// app.get("/", (req, res) => {
//   console.log("Connect Test Success");
// });
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(
  express.json({
    limit: "50mb",
  })
);

//API
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/productDetails", productDetailRouter);

app.use("/api/carts", cartRouter);
app.use("/api/orders", orderRouter);

app.use("/api/reviews", reviewRouter);
app.use("/api/conversations", conversationRoute);
app.use("/api/messages", messageRoute);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

app.listen(process.env.PORT || 5000, () => {
  console.log("Backend server is listening on port");
});
