import React, { useEffect, useState } from "react";
import Product from "../../components/Product/Product";

import { useLocation } from "react-router-dom";
import { publicRequest } from "../../requestMethods";
import "./ProductSearch.scss";
import Products from "../../components/Products/Products";

const ProductSearch = () => {
  const [products, setProducts] = useState([]);
  const [noOfElements, setNoOfElements] = useState(4);
  const location = useLocation();
  const search = location.pathname.split("/")[2];
  // useEffect(() => {
  //   const getProduct = async () => {
  //     try {
  //       const res = await publicRequest.get(`/products${query}`);
  //       setProducts(res.data);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   getProduct();
  // }, [query]);

  // const handleLoadMore = () => {
  //   setNoOfElements(noOfElements + noOfElements);
  // };

  return (
    <div className="productSearch">
      <div className="container">
        <h1 className="title">kết quả tìm kiếm</h1>

        <Products search={search} />
      </div>
    </div>
  );
};

export default ProductSearch;
