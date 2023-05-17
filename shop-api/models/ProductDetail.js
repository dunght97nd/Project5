import mongoose from "mongoose";

const ProductDetailSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },

    size: { type: String, required: true },
    color: { type: String, required: true },
    quantity: { type: Number, required: true },
    ////////////////////////////////
    sold: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model("ProductDetail", ProductDetailSchema);
