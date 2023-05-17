import React from "react";
import { useLocation } from "react-router-dom";

import Products from "../../components/Products/Products";

import "./ProductList.scss";
const ProductList = () => {
  const location = useLocation();
  const cat = location.pathname.split("/")[2];

  return (
    <div className="productList">
      <h1 className="title">{cat}</h1>

      <Products cat={cat} />
    </div>
  );
};

export default ProductList;
