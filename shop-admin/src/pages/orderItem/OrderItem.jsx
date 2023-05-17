import "./orderItem.scss";
import { useRef, useState } from "react";
import { updateOrder, updateProductDetailTitle } from "../../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";

import "react-quill/dist/quill.snow.css";
import { useLocation, useNavigate } from "react-router-dom";
import Table from "../../components/table/Table";
import moment from "moment";

import { useReactToPrint } from "react-to-print";
import PrintIcon from "@mui/icons-material/Print";

const OrderItem = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const orderId = location.pathname.split("/")[2];
  const order = useSelector((state) =>
    state.order.orders.find((order) => order._id === orderId)
  );
  const currentUser = useSelector((state) => state.user.currentUser);

  const dispatch = useDispatch();
  const [status, setStatus] = useState(order.status);
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const newUpdate = {
        status: status,
      };
      console.log(newUpdate);
      if (status === "delivered") {
        updateOrder(orderId, newUpdate, dispatch, currentUser);
        order.products?.map((item, index) => {
          const productdetailtitle =
            item.productId + "-" + item.size + "-" + item.color;

          updateProductDetailTitle(
            productdetailtitle,
            item.productId,
            { quantity: item.quantity },
            dispatch,
            currentUser
          );
        });
      } else {
        updateOrder(orderId, newUpdate, dispatch, currentUser);
      }
      navigate("/orders");
    } catch (err) {
      console.log(err);
    }
  };

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "emp-data",
    // onAfterPrint: () => alert("Print susscess"),
  });

  return (
    <>
      <div className="new" ref={componentRef}>
        <div className="newContainer">
          <div className="top">
            <h1>Order</h1>
            <PrintIcon onClick={handlePrint}>Print</PrintIcon>
          </div>
          <div className="bottom">
            <div className="right">
              <form>
                <div className="formInput">
                  <label>ID</label>
                  <input
                    disabled
                    name="id"
                    type="text"
                    defaultValue={order?._id}
                  ></input>
                </div>
                <div className="formInput">
                  <label>User Name</label>
                  <input
                    disabled
                    name="userName"
                    type="text"
                    defaultValue={order?.userName}
                  ></input>
                </div>
                <div className="formInput">
                  <label>Phone</label>
                  <input
                    disabled
                    name="phone"
                    type="text"
                    defaultValue={order?.phone}
                  ></input>
                </div>

                <div className="formInput">
                  <label>Shipping Address</label>
                  <input
                    disabled
                    name="shippingAddress"
                    type="text"
                    defaultValue={order?.shippingAddress}
                  ></input>
                </div>
                <div className="formInput">
                  <label>Address</label>
                  <input
                    disabled
                    name="address"
                    type="text"
                    defaultValue={order?.address}
                  ></input>
                </div>
                <div className="formInput">
                  <label>Note</label>
                  <input
                    disabled
                    name="note"
                    type="text"
                    defaultValue={order?.note}
                  ></input>
                </div>
                <div className="formInput">
                  <label>Product List</label>
                  <Table rows={order.products} />
                </div>
                <div className="formInput">
                  <label>Total</label>
                  <input
                    disabled
                    name="price"
                    type="text"
                    defaultValue={order?.total.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                  />
                </div>
                <div className="formInput">
                  <label>Payment</label>
                  <input
                    disabled
                    name="payment"
                    type="text"
                    defaultValue={order?.payment}
                  />
                </div>

                <div className="formInput">
                  <label>Status</label>
                  <select
                    name="status"
                    defaultValue={order?.status}
                    onChange={(e) => setStatus(e.target.value)}
                    disabled={
                      (order.status === "delivered" ||
                        order.status === "cancel") &&
                      "disabled"
                    }
                  >
                    <option value="preparing">Preparing</option>
                    <option value="ontheway">On the way</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancel">Cancel</option>
                  </select>
                </div>
                <div className="formInput">
                  <div name="date">{moment(order.updatedAt).calendar()}</div>
                </div>
                {order.status !== "delivered" && order.status !== "cancel" && (
                  <button className="buttonSubmit" onClick={handleClick}>
                    Update Status
                  </button>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderItem;
