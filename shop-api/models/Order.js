import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    userName: { type: String, required: true },
    phone: { type: String },
    products: [
      {
        productId: { type: String, required: true },
        productName: { type: String, required: true },
        color: { type: String, required: true },
        size: { type: String, required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
      },
    ],
    shippingPrice: { type: Number, default: 0 },
    total: { type: Number, required: true },
    shippingAddress: { type: String, required: true },
    address: { type: String },
    note: { type: String },
    status: { type: String, default: "preparing" },
    payment: { type: String, default: "cod" },
  },
  { timestamps: true }
);

export default mongoose.model("Order", OrderSchema);
