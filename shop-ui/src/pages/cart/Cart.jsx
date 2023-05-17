import React from "react";
import { Add, Remove } from "@material-ui/icons";
import DeleteIcon from "@material-ui/icons/Delete";
import "./Cart.scss";

import { useDispatch, useSelector } from "react-redux";

import { useEffect, useState } from "react";
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";

import { Link, useNavigate } from "react-router-dom";
import {
  decreaseCart,
  increaseCart,
  removeItem,
  resetCart,
} from "../../redux/cartRedux";

import { addOrder } from "../../redux/apiCalls";
import { createAxios } from "../../requestMethods";
import { loginSuccess } from "../../redux/userRedux";

// import StripeCheckout from "react-stripe-checkout";

// const KEY = process.env.REACT_APP_STRIPE;

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart.products);
  const user = useSelector((state) => state.user.currentUser);
  const axiosJWT = createAxios(user, dispatch, loginSuccess);

  const total = () => {
    let s = 0;
    cart.forEach((item) => (s += item.price * item.quantity));
    return s.toFixed(1);
  };

  const handleDecreaseCart = (product) => {
    dispatch(decreaseCart(product));
  };

  const handleIncreaseCart = (product) => {
    dispatch(increaseCart(product));
  };

  //Check out paypal
  const [open, setOpen] = useState(false);
  // This values are the props in the UI
  const amount = total() / 25000;
  const currency = "USD";
  const style = { layout: "vertical" };

  // Custom component to wrap the PayPalButtons and handle currency changes
  const ButtonWrapper = ({ currency, showSpinner }) => {
    // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
    // This is the main reason to wrap the PayPalButtons in a new component
    const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

    useEffect(() => {
      dispatch({
        type: "resetOptions",
        value: {
          ...options,
          currency: currency,
        },
      });
    }, [currency, showSpinner]);

    return (
      <>
        {showSpinner && isPending && <div className="spinner" />}
        <PayPalButtons
          style={style}
          disabled={false}
          forceReRender={[amount, currency, style]}
          fundingSource={undefined}
          createOrder={(data, actions) => {
            return actions.order
              .create({
                purchase_units: [
                  {
                    amount: {
                      currency_code: currency,
                      value: amount,
                    },
                  },
                ],
              })
              .then((orderId) => {
                // Your code here after create the order
                return orderId;
              });
          }}
          onApprove={function (data, actions) {
            return actions.order.capture().then(function (details) {
              // Your code here after capture the order
              // console.log(details);
              const shipping = details.purchase_units[0].shipping;
              const newOrder = {
                userName: shipping.name.full_name,
                shippingAddress: shipping.address.address_line_1,
                phone: user.phone,
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
                payment: "paypal",

                // address:
                //   wardName.name + "," + districtName.name + "," + provinceName.name,
              };
              console.log(newOrder);
              addOrder(newOrder, user.accessToken, dispatch, axiosJWT);
              navigate("/");
              dispatch(resetCart());
            });
          }}
        />
      </>
    );
  };

  const handleCheckUser = () => {
    user ? navigate("/checkout") : navigate("/login");
  };
  return (
    <div className="cart">
      <h1 className="title">Giỏ hàng</h1>
      <div className="container">
        <div className="top">
          <Link to="/">
            <button className="topButton">MUA THÊM SẢN PHẨM</button>
          </Link>
          <div className="topTexts">
            <span className="topText">Giỏ hàng({cart.length})</span>
            <span className="topText">Yêu thích (0)</span>
          </div>
          <button className="topButton" onClick={() => dispatch(resetCart())}>
            TẠO LẠI GIỎ HÀNG
          </button>
        </div>
        <div className="bottom">
          <div className="info">
            {cart?.map((product, index) => (
              <div className="product" key={index}>
                <div className="productDetail">
                  <Link to={`/product/${product._id}`}>
                    <img src={product.img[0]} alt="" />
                  </Link>
                  <div className="details">
                    <span className="productName">
                      <b>Sản phẩm:</b> {product.title}
                    </span>
                    <span className="productId">
                      <b>Giá: </b>
                      {product.price.toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </span>
                    <div
                      className="productColor"
                      style={{ backgroundColor: product.color }}
                    />
                    <span className="productSize">
                      <b>Kích cỡ:</b> {product.size}
                    </span>
                  </div>
                </div>
                <div className="priceDetail">
                  <div className="productPrice">
                    {(product.price * product.quantity).toLocaleString(
                      "vi-VN",
                      {
                        style: "currency",
                        currency: "VND",
                      }
                    )}
                  </div>
                  <div className="productAmountContainer">
                    <Add onClick={() => handleIncreaseCart(product)} />
                    <div className="productAmount">
                      {product.quantity > product.maxQuantity
                        ? product.maxQuantity
                        : product.quantity}
                    </div>
                    <Remove onClick={() => handleDecreaseCart(product)} />
                  </div>
                  <DeleteIcon
                    className="delete"
                    onClick={() => dispatch(removeItem(product))}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="summary">
            <h1 className="summaryTitle">TÓM TẮT ĐƠN HÀNG</h1>
            {/*
              <div className="summaryItem">
                <span className="summaryItemText">tổng tiền sản phẩm</span>
                <span className="summaryItemPrice">$ {total()}</span>
              </div>
               <div className="summaryItem">
              <span className="summaryItemText">Estimated Shipping</span>
              <span className="summaryItemPrice">$ 5.90</span>
            </div>
            <div className="summaryItem">
              <span className="summaryItemText">Shipping Discount</span>
              <span className="summaryItemPrice">$ -5.90</span>
            </div> */}
            <div className="summaryTotal">
              <span className="summaryItemText">Tổng tiền: </span>
              <span className="summaryItemPrice">
                {parseInt(total()).toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })}
              </span>
            </div>
            <div className="summaryItem">
              <div className="notice">
                Chưa bao gồm phí vận chuyển, Bạn có thể nhập mã giảm giá ở trang
                thanh toán
              </div>
            </div>

            {open ? (
              <div className="paymentMethods">
                <button
                  className="payButton"
                  style={{ marginBottom: 10 }}
                  onClick={handleCheckUser}
                >
                  THANH TOÁN KHI GIAO HÀNG
                </button>
                {/* PayPal */}
                <PayPalScriptProvider
                  options={{
                    "client-id":
                      "Aben6mCgTnHrOzBL0Cab8piOWWg_WibCF1g6_vyFkeFyIo7H7lTgmXi6oX4U0kofW9wQyBcQ8I8FfNDm",
                    components: "buttons",
                    currency: "USD",
                    // "disable-funding": "credit,card,p24",
                  }}
                >
                  <ButtonWrapper currency={currency} showSpinner={false} />
                </PayPalScriptProvider>
              </div>
            ) : (
              <button onClick={() => setOpen(true)}>TIẾN HÀNH ĐẶT HÀNG!</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
