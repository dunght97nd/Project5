import React, { useState, useEffect } from "react";
import { Add, Home, Remove, Star } from "@material-ui/icons";

import "./ProductItem.scss";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/free-mode";
import "swiper/css/thumbs";
import { Link, useLocation } from "react-router-dom";
import { publicRequest } from "../../requestMethods";

import { addProduct } from "../../redux/cartRedux";
import { useDispatch, useSelector } from "react-redux";

import { toast } from "react-toastify";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper";
import Reviews from "../../components/Reviews/Reviews";
import { findProduct } from "../../redux/apiCalls";

const ProductItem = () => {
  // window.scroll(0, 0);

  const location = useLocation();
  const id = location.pathname.split("/")[2];

  // const [productDetails, setProductDetails] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const dispath = useDispatch();

  const [product, setProduct] = useState([]);
  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await publicRequest.get(`products/find/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getProduct();
  }, [id]);
  //1----------------------------Redux-----------------------------------
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   findProduct(id, dispatch);
  // }, [id, dispatch]);
  // const product = useSelector((state) => state.product.currentProduct);

  const handleQuantity = (type) => {
    if (type === "dec") {
      quantity > 1 && setQuantity(quantity - 1);
    } else {
      setQuantity(quantity + 1);
    }
  };

  const handleAddToCart = () => {
    if (color === "") {
      toast.error("Bạn chưa chọn màu sắc");
    } else if (size === "") {
      toast.error("bạn chưa chọn kích cỡ");
    } else {
      if (quantity > maxQuantity) {
        toast.error("Sản phẩm có số lượng vượt quá cho phép!");
      } else {
        dispath(addProduct({ ...product, quantity, color, size, maxQuantity }));
        toast.success("sản phẩm đã được thêm vào giỏ hàng");
      }
    }
  };
  const maxQuantity = product?.productDetail
    ?.filter((obj) => obj.color === color && obj.size === size)
    ?.map((obj) => obj.quantity)
    ?.reduce((sum, obj) => sum + obj, 0);

  const filteredColor = product.productDetail?.filter(
    ({ color, quantity }, index) =>
      !product.productDetail?.map((o) => o.color).includes(color, index + 1) &&
      quantity > 0
  );

  const filteredSize = product.productDetail?.filter(
    ({ size, quantity }, index) =>
      !product.productDetail?.map((o) => o.size).includes(size, index + 1) &&
      quantity > 0
  );

  return (
    product && (
      <div className="productItem">
        <div className="breadcrumb">
          <ul>
            <li>
              <Home style={{ fontSize: 15, marginBottom: 1.5 }} />
              <Link to="/">Trang chủ</Link>
            </li>
            <li>
              <Link
                to={`/products/${
                  product.categories?.map((category) => category)[1]
                }`}
              >
                {product.categories?.map((category) => category)[1]}
              </Link>
            </li>
            <li>{product.title}</li>
          </ul>
        </div>
        <div className="container">
          <div className="imgContainer">
            <Swiper
              style={{
                "--swiper-navigation-color": "#fff",
                "--swiper-pagination-color": "#fff",
              }}
              loop={true}
              spaceBetween={10}
              navigation={true}
              thumbs={{ swiper: thumbsSwiper }}
              modules={[FreeMode, Navigation, Thumbs]}
              className="mySwiper2"
            >
              {product.img?.map((item, index) => (
                <SwiperSlide key={index}>
                  <img src={item} alt="" />
                </SwiperSlide>
              ))}
            </Swiper>
            <Swiper
              onSwiper={setThumbsSwiper}
              loop={true}
              spaceBetween={10}
              slidesPerView={4}
              freeMode={true}
              watchSlidesProgress={true}
              modules={[FreeMode, Navigation, Thumbs]}
              className="mySwiper"
            >
              {product.img?.map((item, index) => (
                <SwiperSlide key={index}>
                  <img src={item} alt="" />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div className="infoContainer">
            <h2 className="title">{product.title}</h2>
            {/* <div className="stars">
              {!isNaN(product.totalStars / product.starNumber) &&
                Array(Math.round(product.totalStars / product.starNumber))
                  .fill()
                  .map((item, i) => <Star className="star" key={i} />)}
            </div> */}
            {product.productDetail
              // ?.filter((obj) => obj.color === "black")
              ?.map((obj) => obj.quantity)
              ?.reduce((sum, obj) => sum + obj, 0) === 0 && (
              <div className="status">Hết hàng</div>
            )}
            <span className="price">
              {product.price?.toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}
            </span>
            <div className="filterContainer">
              <div className="filter">
                <span className="filterTitle">Màu sắc:</span>
                {filteredColor?.map((item, index) => (
                  <div
                    key={index}
                    className={`filterColor ${
                      color === item.color ? "active" : ""
                    }`}
                    style={{ backgroundColor: item.color }}
                    onClick={() => setColor(item.color)}
                  />
                ))}
              </div>
              <div className="filter">
                <span className="filterTitle">Kích cỡ:</span>
                <select
                  defaultValue="Choose"
                  className="filterSize"
                  onChange={(e) => setSize(e.target.value)}
                >
                  <option disabled className="filterSizeOption">
                    Choose
                  </option>
                  {filteredSize?.map((item, index) => (
                    <option className="filterSizeOption" key={index}>
                      {item.size}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="addContainer">
              <div className="amountContainer">
                <span className="amountTitle">Số lượng:</span>
                <Remove onClick={() => handleQuantity("dec")} />
                <span className="amount">{quantity}</span>
                <Add onClick={() => handleQuantity("inc")} />
              </div>
              <button onClick={handleAddToCart}>THÊM VÀO GIỎ HÀNG</button>
              <Link to="/cart">
                <button>GIỎ HÀNG</button>
              </Link>
            </div>
            {/* {productDetails.map((productDetail) => (
              <div key={productDetail._id}>
                {productDetail.color +
                  " " +
                  productDetail.size +
                  " " +
                  productDetail.quantity}
              </div>
            ))} */}
            {/* {product.productDetail
              // ?.filter((obj) => obj.color === "black")
              ?.map((obj) => obj.quantity)
              ?.reduce((sum, obj) => sum + obj, 0)} */}
            <div
              className="desc"
              dangerouslySetInnerHTML={{ __html: product.desc }}
            ></div>
          </div>
        </div>
        <Reviews productId={id} />
      </div>
    )
  );
};

export default ProductItem;
