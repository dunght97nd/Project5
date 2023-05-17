import React, { useEffect, useState } from "react";
import "./Reviews.scss";

import Review from "../Review/Review";
import StarRating from "../StarRating/StarRating";

import { addReview, getReviews } from "../../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { createAxios } from "../../requestMethods";
import { loginSuccess } from "../../redux/userRedux";
import { Star } from "@material-ui/icons";
import ProgressBar from "../ProgressBar/ProgressBar";

const Reviews = ({ productId }) => {
  const [starNumber, setStarNumber] = useState();
  const [desc, setDesc] = useState();

  const getStarNumber = (star) => {
    setStarNumber(star);
  };

  const dispatch = useDispatch();
  const curentUser = useSelector((state) => state.user.currentUser);
  const { isFetching, reviews, error } = useSelector((state) => state.review);
  const axiosJWT = createAxios(curentUser, dispatch, loginSuccess);

  useEffect(() => {
    getReviews(productId, dispatch, curentUser?._id);
  }, [productId, dispatch, curentUser?._id]);
  const handleChange = (e) => {
    setDesc(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const newReview = {
        userId: curentUser._id,
        productId: productId,
        star: starNumber,
        desc: desc,
      };
      addReview(
        newReview,
        curentUser._id,
        curentUser.accessToken,
        dispatch,
        axiosJWT
      );
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="reviews">
      <hr />
      <h2>Đánh giá sản phẩm: </h2>
      <div className="add">
        {reviews.length > 0 && (
          <div className="right">
            <div className="title">Đánh Giá Trung Bình</div>
            <span>
              {Math.round(
                reviews
                  ?.map((obj) => obj.star)
                  ?.reduce((sum, obj) => sum + obj, 0) /
                  reviews?.reduce((sum, obj) => sum + 1, 0)
              )}
              /5
            </span>
            <div className="stars">
              {Array(
                Math.round(
                  reviews
                    ?.map((obj) => obj.star)
                    ?.reduce((sum, obj) => sum + obj, 0) /
                    reviews?.reduce((sum, obj) => sum + 1, 0)
                )
              )
                .fill()
                .map((item, i) => (
                  <Star className="star" key={i} />
                ))}
            </div>
            <div className="total">
              {reviews?.reduce((sum, obj) => sum + 1, 0)} đánh giá
            </div>
          </div>
        )}
        <div className="progressList">
          <div className="progressItem">
            <span>5</span>
            <Star className="star" />
            <ProgressBar
              percent={
                (reviews
                  ?.filter((review) => review.star === 5)
                  ?.reduce((sum, obj) => sum + 1, 0) /
                  reviews?.reduce((sum, obj) => sum + 1, 0)) *
                100
              }
            />
            <span>
              {reviews
                ?.filter((review) => review.star === 5)
                ?.reduce((sum, obj) => sum + 1, 0)}
            </span>
          </div>
          <div className="progressItem">
            <span>4</span>
            <Star className="star" />
            <ProgressBar
              percent={
                (reviews
                  ?.filter((review) => review.star === 4)
                  ?.reduce((sum, obj) => sum + 1, 0) /
                  reviews?.reduce((sum, obj) => sum + 1, 0)) *
                100
              }
            />
            <span>
              {reviews
                ?.filter((review) => review.star === 4)
                ?.reduce((sum, obj) => sum + 1, 0)}
            </span>
          </div>
          <div className="progressItem">
            <span>3</span>
            <Star className="star" />
            <ProgressBar
              percent={
                (reviews
                  ?.filter((review) => review.star === 3)
                  ?.reduce((sum, obj) => sum + 1, 0) /
                  reviews?.reduce((sum, obj) => sum + 1, 0)) *
                100
              }
            />
            <span>
              {reviews
                ?.filter((review) => review.star === 3)
                ?.reduce((sum, obj) => sum + 1, 0)}
            </span>
          </div>
          <div className="progressItem">
            <span>2</span>
            <Star className="star" />
            <ProgressBar
              percent={
                (reviews
                  ?.filter((review) => review.star === 2)
                  ?.reduce((sum, obj) => sum + 1, 0) /
                  reviews?.reduce((sum, obj) => sum + 1, 0)) *
                100
              }
            />
            <span>
              {reviews
                ?.filter((review) => review.star === 2)
                ?.reduce((sum, obj) => sum + 1, 0)}
            </span>
          </div>
          <div className="progressItem">
            <span>1 </span>
            <Star className="star" />
            <ProgressBar
              percent={
                (reviews
                  ?.filter((review) => review.star === 1)
                  ?.reduce((sum, obj) => sum + 1, 0) /
                  reviews?.reduce((sum, obj) => sum + 1, 0)) *
                100
              }
            />
            <span>
              {reviews
                ?.filter((review) => review.star === 1)
                ?.reduce((sum, obj) => sum + 1, 0)}
            </span>
          </div>
        </div>
        <form action="" className="addForm" onSubmit={handleSubmit}>
          <StarRating getStar={getStarNumber} />
          <textarea
            type="text"
            placeholder="Viết ý kiến ​​​​của bạn ..."
            onChange={handleChange}
          />
          <button className="send">Gửi nhận xét</button>
        </form>
      </div>
      {reviews?.map((item, index) => (
        <Review key={index} review={item} />
      ))}
      <hr />
    </div>
  );
};

export default Reviews;
