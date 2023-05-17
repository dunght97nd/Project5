import Product from "../models/Product.js";
import ProductDetail from "../models/ProductDetail.js";

//Create
export const createProductDetail = async (req, res, next) => {
  const productId = req.params.productId;
  const newProductDetail = new ProductDetail(req.body);

  try {
    const savedProductDetail = await newProductDetail.save();
    try {
      await Product.findByIdAndUpdate(productId, {
        $push: { productDetail: savedProductDetail._id },
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json(savedProductDetail);
  } catch (err) {
    next(err);
  }
};

//Update
export const updateProductDetail = async (req, res, next) => {
  try {
    const updatedProductDetail = await ProductDetail.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedProductDetail);
  } catch (err) {
    next(err);
  }
};

export const updateProductDetailQuantity = async (req, res, next) => {
  try {
    const updatedProductDetail = await ProductDetail.findOneAndUpdate(
      { title: req.params.title },
      {
        $inc: { quantity: -req.body.quantity, sold: req.body.quantity },
      },
      { new: true }
    );
    try {
      await Product.findByIdAndUpdate(req.params.title.split("-")[0], {
        $inc: { sold: req.body.quantity },
      });
    } catch (err) {
      next(err);
    }

    res.status(200).json(updatedProductDetail);
  } catch (err) {
    next(err);
  }
};

//Delete
export const deleteProductDetail = async (req, res, next) => {
  const productId = req.params.productId;
  try {
    await ProductDetail.findByIdAndDelete(req.params.id);
    try {
      await Product.findByIdAndUpdate(productId, {
        $pull: { details: req.params.id },
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json("Product Detail has been deleted.");
  } catch (err) {
    next(err);
  }
};

//Get ProductDetail
export const findProductDetail = async (req, res, next) => {
  try {
    const productDeProductDetail = await ProductDetail.findById(req.params.id);
    res.status(200).json(productDeProductDetail);
  } catch (err) {
    next(err);
  }
};

//Get all productDeProductDetail
export const getProductDetail = async (req, res, next) => {
  try {
    const productDeProductDetails = await ProductDetail.find().sort({
      createdAt: -1,
    });

    res.status(200).json(productDeProductDetails);
  } catch (err) {
    next(err);
  }
};
