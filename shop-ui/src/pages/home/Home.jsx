import React from "react";
import Slider from "../../components/Slider/Slider";
import Products from "../../components/Products/Products";
import Categories from "../../components/Categories/Categories";

import "./Home.scss";

const Home = () => {
  return (
    <div className="home">
      <Slider />
      <div className="container">
        <div className="newProduct">
          <h1 className="title">sản phẩm mới</h1>
          <Products />
        </div>

        <div className="sellingProduct">
          <h1 className="title">sản phẩm bán chạy</h1>
          <Products type="sold" />
        </div>
      </div>
      {/* <div className="lookBook">
          <h1 className="title">lookbook</h1>
        </div>

        <div className="news">
          <h1 className="title">tin tức</h1>
        </div> */}
      <Categories />
    </div>
  );
};

export default Home;
