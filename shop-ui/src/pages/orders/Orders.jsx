import "./Orders.scss";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getOrder } from "../../redux/apiCalls";
import { loginSuccess } from "../../redux/userRedux";
import { createAxios, publicRequest } from "../../requestMethods";
import moment from "moment";
import SmsIcon from "@material-ui/icons/Sms";
import { Link, useNavigate } from "react-router-dom";

const Orders = () => {
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.user.currentUser);

  const dispatch = useDispatch();
  //--------------------------RefreshToken----------------------------------
  const axiosJWT = createAxios(currentUser, dispatch, loginSuccess);

  //--------------------------Get Orders -------------------------------------
  useEffect(() => {
    getOrder(currentUser._id, currentUser.accessToken, dispatch, axiosJWT);
  }, [currentUser._id, dispatch]);

  const orders = useSelector((state) => state.order.orders);
  //
  const handleContact = async (order) => {
    // const sellerId = "63e61ab2b39058efdd2156c3"; // order.sellerId;
    // const buyerId = currentUser._id;
    // const id = order._id + buyerId;
    // try {
    //   const res = await publicRequest.get(`/conversations/single/${id}`);
    //   navigate(`/conversations/${res.data.id}`);
    // } catch (err) {
    //   console.error(err);
    //   if (err.response.status === 404) {
    //     const res = await publicRequest.post(`/conversations/`, {
    //       to: currentUser.isAdmin ? buyerId : sellerId,
    //     });
    //     navigate(`/conversations/${res.data.id}`);
    //   }
    // }
  };
  return (
    <div className="orders">
      <div className="ordersContainer">
        <div className="top">
          <h1>Đơn đặt hàng của bạn</h1>
        </div>
        <div className="bottom">
          <table>
            <tbody>
              <tr>
                <th>ID</th>
                <th>Products</th>
                <th>Total</th>
                <th>Payment</th>
                <th>Time Order</th>
                <th>Status</th>
                <th>Contact</th>
              </tr>
              {orders?.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>
                    {order.products.map((item) => (
                      <div
                        key={item._id}
                        className="productItem"
                      >{`${item.productName}-${item.color}-${item.size}(${item.quantity})`}</div>
                    ))}
                  </td>
                  <td>
                    {order.total.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </td>
                  <td>{order.payment}</td>
                  <td> {moment(order.createdAt).calendar()}</td>
                  <td>
                    <div
                      className={
                        order.status === "preparing"
                          ? "preparing"
                          : order.status === "ontheway"
                          ? "ontheway"
                          : order.status === "delivered"
                          ? "delivered"
                          : "cancel"
                      }
                    >
                      {order.status}
                      <span> ({moment(order.updatedAt).calendar()})</span>
                    </div>
                  </td>

                  {/* <td>
                    <SmsIcon onClick={() => handleContact(order)} />
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Orders;
