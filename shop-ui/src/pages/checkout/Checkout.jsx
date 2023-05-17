import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import FormInput from "../../components/FormInput/FormInput";
import { addOrder } from "../../redux/apiCalls";
import { resetCart } from "../../redux/cartRedux";
import { loginSuccess } from "../../redux/userRedux";
import { createAxios } from "../../requestMethods";

import "./Checkout.scss";

const Checkout = () => {
  const [provinces, setProvinces] = useState([]);
  const [province, setProvince] = useState("");
  const [districts, setDistricts] = useState([]);
  const [district, setDistrict] = useState("");
  const [wards, setWards] = useState([]);
  const [ward, setWard] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const input = [
    {
      id: 1,
      name: "userName",
      type: "text",
      placeholder: "Tên nguời nhận",
      pattern: "^[a-zA-Z0-9 .,#;:'-]{1,40}$",
      label: "Tên nguời nhận",
      required: true,
    },
    {
      id: 2,
      name: "phone",
      type: "text",
      placeholder: "Số điện thoại",
      errorMessage: "It should be a valid phone!",
      label: "Số điện thoại",
      pattern: "^[0-9]{9,10}$",
      required: true,
    },
    {
      id: 3,
      name: "shippingAddress",
      type: "text",
      placeholder: "Địa chỉ nhận hàng",
      errorMessage: "It should be a valid address!",
      label: "Địa chỉ nhận hàng",
      pattern: "^[a-zA-Z0-9 .,#;:'-]{1,40}$",
      required: true,
    },
  ];
  useEffect(() => {
    const getProvince = async () => {
      try {
        const res = await axios.get(
          `https://api.mysupership.vn/v1/partner/areas/province`
        );

        setProvinces(res.data);
      } catch (err) {}
    };
    getProvince();
  }, []);
  useEffect(() => {
    const getDistricts = async () => {
      try {
        const res = await axios.get(
          `https://api.mysupership.vn/v1/partner/areas/district?province=${province}`
        );

        setDistricts(res.data);
      } catch (err) {}
    };
    getDistricts();
  }, [province]);
  useEffect(() => {
    const getWards = async () => {
      try {
        const res = await axios.get(
          `https://api.mysupership.vn/v1/partner/areas/commune?district=${district}`
        );

        setWards(res.data);
      } catch (err) {}
    };
    getWards();
  }, [province, district]);

  //Cart
  const cart = useSelector((state) => state.cart.products);
  const user = useSelector((state) => state.user.currentUser);
  const axiosJWT = createAxios(user, dispatch, loginSuccess);
  const [inputs, setInputs] = useState({
    userName: user?.username,
    phone: user?.phone,
    shippingAddress: user?.address,
  });
  const total = () => {
    let s = 0;
    cart.forEach((item) => (s += item.price * item.quantity));
    return s.toFixed(1);
  };

  const provinceName = provinces.results?.find(
    (item) => item.code === province
  );
  const districtName = districts.results?.find(
    (item) => item.code === district
  );
  const wardName = wards.results?.find((item) => item.code === ward);

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  // console.log(inputs);

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const newOrder = {
        ...inputs,
        userId: user._id,
        products: cart.map((item) => ({
          productId: item._id,
          productName: item.title,
          color: item.color,
          size: item.size,
          quantity: item.quantity,
          price: item.price,
        })),
        total: parseInt(total()),

        // address:
        //   wardName.name + "," + districtName.name + "," + provinceName.name,
      };
      console.log(newOrder);
      addOrder(newOrder, user.accessToken, dispatch, axiosJWT);
      navigate("/");
      dispatch(resetCart());
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="checkout">
      <div className="container">
        <h1 className="title">Thông tin giao hàng</h1>
        <div className="wrapper">
          <div className="top">
            <Link to="/">
              <button className="topButton">Mua thêm sản phẩm</button>
            </Link>
            <Link to="/cart">
              <button className="topButton">Quay lại giỏ hàng</button>
            </Link>
          </div>
          <form onSubmit={handleClick}>
            <div className="info">
              {/* <input
                name="userName"
                type="text"
                className="item"
                placeholder="họ và tên"
                onChange={handleChange}
                required
              />
              <input
                name="phone"
                type="text"
                className="item"
                placeholder="số điện thoại"
                onChange={handleChange}
              />
              <input
                name="shippingAddress"
                type="text"
                className="item"
                placeholder="địa chỉ nhận hàng"
                onChange={handleChange}
              /> */}
              {input.map((item) => (
                <FormInput
                  key={item.id}
                  {...item}
                  value={inputs[item.name]}
                  onChange={handleChange}
                />
              ))}
              {/* <div className="filter">
                <span className="province">Tỉnh/Thành phố:</span>
                <select
                  defaultValue="province"
                  className="province"
                  onChange={(e) => {
                    setProvince(e.target.value);
                  }}
                >
                  <option disabled className="province">
                    Chọn tỉnh thành phố
                  </option>
                  {provinces.results?.map((province, index) => (
                    <option
                      className="province"
                      key={index}
                      value={province.code}
                    >
                      {province.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="filter">
                <span className="district">Quận/huyện:</span>
                <select
                  defaultValue="Choose"
                  className="district"
                  onChange={(e) => {
                    setDistrict(e.target.value);
                  }}
                >
                  <option disabled className="district">
                    chọn quận/huyện
                  </option>
                  {districts.results?.map((district, index) => (
                    <option
                      className="district"
                      key={index}
                      value={district.code}
                    >
                      {district.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="filter">
                <span className="ward">Phường /xã:</span>
                <select
                  defaultValue="Choose"
                  className="ward"
                  onChange={(e) => {
                    setWard(e.target.value);
                  }}
                >
                  <option disabled className="ward">
                    chọn phường /xã:
                  </option>
                  {wards.results?.map((ward, index) => (
                    <option className="ward" key={index} value={ward.code}>
                      {ward.name}
                    </option>
                  ))}
                </select>
              </div> */}
              <textarea
                name="note"
                className="item"
                placeholder="Ghi chú"
                onChange={handleChange}
              />
              {/* <div className="method">
                <span>Phương thức thanh toán:</span>
                <div className="item">
                  <input
                    type="radio"
                    value="cod"
                    onChange={handleChange}
                    name="payment"
                  />
                  <span>Thanh toán khi nhận hàng (COD)</span>
                </div>
              </div> */}
            </div>

            <div className="summary">
              <h1 className="summaryTitle">CHI TIẾT ĐƠN HÀNG</h1>
              <div className="summaryItem">
                <span className="summaryItemText">Tổng tiền sản phẩm:</span>
                <span className="summaryItemPrice">
                  {parseInt(total()).toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                </span>
              </div>
              <div className="summaryItem">
                <span className="summaryItemText">Phí vận chuyển:</span>
                <span className="summaryItemPrice">0</span>
              </div>
              <div className="summaryItem">
                <span className="summaryItemText">Mã giảm giá:</span>
                <span className="summaryItemPrice">0</span>
              </div>
              <div className="summaryTotal">
                <span className="summaryItemText">Tổng tiền:</span>
                <span className="summaryItemPrice">
                  {" "}
                  {parseInt(total()).toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                </span>
              </div>
              <div className="summaryItem">
                <div className="notice">
                  Krik sẽ xác nhận đơn hàng bằng cách gọi điện thoại. Bạn vui
                  lòng để ý điện thoại khi đặt hàng thành công và chờ nhận hàng.
                  Cảm ơn bạn !
                </div>
              </div>

              <button>HOÀN TẤT ĐƠN HÀNG</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
