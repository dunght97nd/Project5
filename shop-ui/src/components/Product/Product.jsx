import React from "react";

import {
  ShoppingCartOutlined,
  SearchOutlined,
  FavoriteBorderOutlined,
} from "@material-ui/icons";
import "./Product.scss";
import { Link } from "react-router-dom";

const Product = ({ item }) => {
  const quantity = item.productDetail
    // ?.filter((obj) => obj.color === "black")
    ?.map((obj) => obj.quantity)
    ?.reduce((sum, obj) => sum + obj, 0);
  return (
    <div className="productCard">
      <div className="img">
        <img src={item.img[0]} alt="" />
        {quantity === 0 && <div className="status">Hết hàng</div>}
        <div className="info">
          <div className="icon">
            <ShoppingCartOutlined />
          </div>

          <Link to={`/product/${item._id}`}>
            <div className="icon">
              <SearchOutlined />
            </div>
          </Link>

          <div className="icon">
            <FavoriteBorderOutlined />
          </div>
        </div>
      </div>

      <div className="detail">
        <div className="name">{item.title}</div>
        <div className="colors">
          {item.color.map((item, index) => (
            <div
              key={index}
              className="color"
              style={{ backgroundColor: item }}
            />
          ))}
        </div>

        <div className="price">
          {item.price.toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
          })}
        </div>
      </div>
    </div>
  );
};

export default Product;
