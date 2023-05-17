import Review from "../models/Review.js";
import Product from "../models/Product.js";
import { createError } from "../routes/error.js";

export const createReview = async (req, res, next) => {
  // console.log(req.user);
  if (req.user.isAdmin)
    return next(createError(403, "Sellers can't create a review!"));

  const newReview = new Review({
    // userId: req.user.id, //From jwt
    userId: req.body.userId,

    productId: req.body.productId,
    desc: req.body.desc,
    star: req.body.star,
  });

  try {
    const review = await Review.findOne({
      productId: req.body.productId,
      userId: req.body.userId,
    });

    if (review)
      return next(
        createError(403, "You have already created a review for this product!")
      );

    //TODO: check if the user purchased the Product.

    const savedReview = await newReview.save();

    await Product.findByIdAndUpdate(req.body.productId, {
      $inc: { totalStars: req.body.star, starNumber: 1 },
    });
    res.status(201).send(savedReview);
  } catch (err) {
    next(err);
  }
};

export const getReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find({ productId: req.params.productId }).sort(
      { createdAt: -1 }
    );
    res.status(200).send(reviews);
  } catch (err) {
    next(err);
  }
};
export const deleteReview = async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
};
