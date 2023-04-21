import React, { useEffect, useState } from "react";
import "./Review.scss";

// import ReviewItem from "../ReviewItem/ReviewItem";
import { Star, ThumbDownOutlined, ThumbUpOutlined } from "@material-ui/icons";
import { findUser } from "../../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { publicRequest } from "../../requestMethods";
import moment from "moment";
const Review = ({ review }) => {
  const [user, setUser] = useState();
  useEffect(() => {
    const findUser = async () => {
      try {
        const { data } = await publicRequest(`users/find/${review.userId}`);
        setUser(data);
      } catch (err) {
        console.log(err);
      }
    };
    findUser();
  }, [review.userId]);

  const hideemail = function (user_email) {
    var avg, splitted, part1, part2;
    splitted = user_email.split("@");
    part1 = splitted[0];
    avg = part1.length / 2;
    part1 = part1.substring(0, part1.length - avg);
    part2 = splitted[1];
    return part1 + "...@" + part2;
  };
  return (
    <div className="review">
      <div className="user">
        <img className="pp" src={user?.image} alt="" />
        <div className="info">
          <span>{user?.username}</span>
          <div className="country">
            <span>{user?.email && hideemail(user?.email)}</span>
          </div>
        </div>
      </div>
      <div className="stars">
        {Array(review.star)
          .fill()
          .map((item, i) => (
            <Star className="star" key={i} />
          ))}
      </div>
      <p>{review.desc}</p>
      <div className="helpful">
        <div className="time">{moment(review.createdAt).fromNow()}</div>
        <ThumbUpOutlined className="thumb" />
        <span>Có</span>
        <ThumbDownOutlined className="thumb" />
        <span>Không</span>
      </div>
    </div>
  );
};

export default Review;
