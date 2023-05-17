import React from "react";
import { useState, useEffect } from "react";

import Product from "../Product/Product";
import Pagination from "../Pagination/Pagination";

import "./Products.scss";
import { publicRequest } from "../../requestMethods";

// import { getProducts } from "../../redux/apiCalls";
// import { useDispatch, useSelector } from "react-redux";

import Filter from "../Filter/Filter";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../redux/apiCalls";

const Products = ({ cat, type, search }) => {
  const [data, setData] = useState([]);
  // const [filterProducts, setFilterProducts] = useState([]);
  // const [currentPage, setCurrentPage] = useState(1);
  // const postPerPage = 8;

  // //Get Products
  // useEffect(() => {
  //   const getProducts = async () => {
  //     try {
  //       const res = await publicRequest(
  //         cat ? `products?category=${cat}` : `products`
  //       );

  //       setProducts(res.data);
  //     } catch (err) {}
  //   };
  //   getProducts();
  // }, [cat]);
  // // const dispatch = useDispatch();
  // // useEffect(() => {
  // //   getProducts(cat, dispatch);
  // // }, [cat, dispatch]);
  // // const products = useSelector((state) => state.product.products);
  // //Fillter Products: Color and Size
  // useEffect(() => {
  //   cat &&
  //     setFilterProducts(
  //       products.filter((item) =>
  //         Object.entries( ).every(([key, value]) =>
  //           item[key].includes(value)
  //         )
  //       )
  //     );
  //   setCurrentPage(1);
  // }, [products, cat, filters]);

  // //Sort Products
  // useEffect(() => {
  //   if (sort === "newest") {
  //     setFilterProducts((prev) =>
  //       [...prev].sort((a, b) => b.createdAt.localeCompare(a.createdAt))
  //     );
  //   } else if (sort === "asc") {
  //     setFilterProducts((prev) => [...prev].sort((a, b) => a.price - b.price));
  //   } else if (sort === "desc") {
  //     setFilterProducts((prev) => [...prev].sort((a, b) => b.price - a.price));
  //   } else {
  //     setFilterProducts((prev) => [...prev].sort((a, b) => b.sold - a.sold));
  //   }
  //   setCurrentPage(1);
  // }, [sort]);

  //----------------------------------------------------------------
  // useEffect(() => {
  //   type &&
  //     setFilterProducts(products.filter((item) => item.featured === true));
  // }, [products, type]);

  // //----------------------------------------------------------------
  // const lastPostIndex = currentPage * postPerPage;
  // const firtPostIndex = lastPostIndex - postPerPage;

  //----------------------------------------------------------------
  const [sort, setSort] = useState({
    sort: type ? type : "createdAt",
    order: "desc",
  });
  const [filterColor, setFilterColor] = useState([]);
  const [filterSize, setFilterSize] = useState([]);

  const [page, setPage] = useState(1);

  useEffect(() => {
    const getAllProducts = async () => {
      try {
        const url = `products?page=${page}&sort=${sort.sort},${
          sort.order
        }&cat=${
          cat ? cat : ""
        }&color=${filterColor}&size=${filterSize}&search=${search || ""}`;
        const { data } = await publicRequest(url);
        setData(data);
      } catch (err) {
        console.log(err);
      }
    };
    getAllProducts();
  }, [sort, filterColor, filterSize, cat, page, search]);

  return (
    <div>
      {(cat || search) && (
        <Filter
          cat={cat}
          setSort={(sort) => setSort(sort)}
          color={data.color}
          setFilterColor={(color) => setFilterColor(color)}
          size={data.size}
          setFilterSize={(size) => setFilterSize(size)}
          setPage={(page) => setPage(page)}
        />
      )}
      <div className="products">
        {data.products?.map((item, index) => (
          <Product item={item} key={index} />
        ))}
      </div>

      {(cat || search) && (
        <Pagination
          page={page}
          limit={data.limit ? data.limit : 0}
          total={data.total ? data.total : 0}
          setPage={(page) => setPage(page)}
        />
      )}
    </div>
  );
};

export default Products;
