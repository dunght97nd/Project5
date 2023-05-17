import Widget from "../../components/widget/Widget";
import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/Chart";
import Table from "../../components/table/Table";
import "./OrderOverView.scss";
import { useEffect, useMemo, useState } from "react";
import { userRequest } from "../../requestMethods";
import { useSelector } from "react-redux";
// import { useSelector } from "react-redux";

const OrderOverView = () => {
  const [userStats, setUserStats] = useState([]);
  const currentUser = useSelector((state) => state.user.currentUser);

  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "June",
      "July",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );

  useEffect(() => {
    const getUserStats = async () => {
      try {
        const res = await userRequest(currentUser.accessToken).get(
          "/orders/income"
        );
        res.data.map((item) =>
          setUserStats((prev) => [
            ...prev,
            { _id: MONTHS[item._id - 1], total: item.total },
          ])
        );
      } catch {}
    };
    getUserStats();
  }, [MONTHS, currentUser.accessToken]);
  return (
    <div className="orderOverView">
      <div className="orderOverViewContainer">
        <Chart title="Monthly" aspect={2 / 1} data={userStats} />
      </div>
    </div>
  );
};

export default OrderOverView;
