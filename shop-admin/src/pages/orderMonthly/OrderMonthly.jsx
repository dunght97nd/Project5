import Widget from "../../components/widget/Widget";
import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/Chart";
import Table from "../../components/table/Table";
import "./OrderMonthly.scss";
import { useEffect, useMemo, useState } from "react";
import { userRequest } from "../../requestMethods";
import { useSelector } from "react-redux";
// import { useSelector } from "react-redux";
import moment from "moment";

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const OrderMonthly = () => {
  const [userStats, setUserStats] = useState([]);
  const currentUser = useSelector((state) => state.user.currentUser);

  const [startDate, setStartDate] = useState(new Date("2023/01"));
  const [endDate, setEndDate] = useState(new Date("2023/12"));
  console.log(endDate, startDate);
  useEffect(() => {
    const getUserStats = async () => {
      try {
        const res = await userRequest(currentUser.accessToken).get(
          `/orders/monthly?startDate=${startDate}&endDate=${endDate}`
        );
        // res.data.map((item) =>
        //   setUserStats((prev) => [
        //     ...prev,
        //     {
        //       _id: [moment(item._id).calendar()],
        //       total: item.total,
        //     },
        //   ])
        // );
        const data = res.data.map((item) => ({
          _id: item._id.month + "/" + item._id.year,
          total: item.total,
        }));

        setUserStats(data);
      } catch {}
    };
    getUserStats();
  }, [currentUser.accessToken, startDate, endDate]);
  return (
    <div className="orderMonthly">
      <div className="orderMonthlyContainer">
        <div className="datePicker">
          <div className="startDate">
            <span>Start Date</span>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              dateFormat="MM/yyyy"
              showMonthYearPicker
            />
          </div>
          <div className="endDate">
            <span>End Date</span>

            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              dateFormat="MM/yyyy"
              showMonthYearPicker
            />
          </div>
        </div>
        <div className="charts">
          <Chart title="Monthly" aspect={2 / 1} data={userStats} />
        </div>
      </div>
    </div>
  );
};

export default OrderMonthly;
