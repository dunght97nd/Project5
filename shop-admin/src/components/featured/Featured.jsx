import "./featured.scss";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import { useDispatch, useSelector } from "react-redux";

const Featured = () => {
  const orders = useSelector((state) => state.order.orders);
  const products = useSelector((state) => state.product.products);

  // const total = products.productDetail
  //   // ?.filter((obj) => obj.color === "black")
  //   ?.map((obj) => obj)
  //   ?.reduce((sum, obj) => sum + obj.quantity * 300, 0);
  const amount = orders
    ?.filter((obj) => obj.status === "delivered")
    ?.map((obj) => obj.total)
    ?.reduce((sum, obj) => sum + obj, 0)
    .toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });

  return (
    <div className="featured">
      <div className="top">
        <h1 className="title">Total Revenue</h1>
        <MoreVertIcon fontSize="small" />
      </div>
      <div className="bottom">
        <div className="featuredChart">
          <CircularProgressbar value={70} text={"70%"} strokeWidth={5} />
        </div>
        <p className="title">Total sales made</p>
        <p className="amount">{amount}</p>
        <p className="desc">
          Previous transactions processing. Last payments may not be included.
        </p>
        {/* <div className="summary">
          <div className="item">
            <div className="itemTitle">Target</div>
            <div className="itemResult negative">
              <KeyboardArrowDownIcon fontSize="small" />
              <div className="resultAmount">$12.4k</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">Last Week</div>
            <div className="itemResult positive">
              <KeyboardArrowUpOutlinedIcon fontSize="small" />
              <div className="resultAmount">$12.4k</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">Last Month</div>
            <div className="itemResult positive">
              <KeyboardArrowUpOutlinedIcon fontSize="small" />
              <div className="resultAmount">$12.4k</div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Featured;
