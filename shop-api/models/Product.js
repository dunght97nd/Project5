import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    desc: { type: String, required: true },
    img: [String],
    categories: [String],
    price: { type: Number, required: true },
    size: [String],
    color: [String],

    rating: {
      type: Number,
      min: 0,
      max: 5,
    },
    comments: [String],
    featured: { type: Boolean, default: true },
    sold: { type: Number, default: 0 },

    productDetail: [{ type: String, ref: "ProductDetail" }],

    //
    totalStars: {
      type: Number,
      default: 0,
    },
    starNumber: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Product", ProductSchema);
