import Widget from "../../components/widget/Widget";
import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/Chart";
import Table from "../../components/table/Table";
import "./OrderDaily.scss";
import { useEffect, useMemo, useState } from "react";
import { userRequest } from "../../requestMethods";
import { useSelector } from "react-redux";
// import { useSelector } from "react-redux";
import moment from "moment";

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const OrderDaily = () => {
  const [userStats, setUserStats] = useState([]);
  const currentUser = useSelector((state) => state.user.currentUser);

  const [startDate, setStartDate] = useState(new Date("2023/01/01"));
  const [endDate, setEndDate] = useState(new Date("2023/03/05"));

  useEffect(() => {
    const getUserStats = async () => {
      try {
        const res = await userRequest(currentUser.accessToken).get(
          `/orders/daily?startDate=${startDate}&endDate=${endDate}`
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
          _id: moment(item._id).calendar(),
          total: item.total,
        }));

        setUserStats(data);
      } catch {}
    };
    getUserStats();
  }, [currentUser.accessToken, startDate, endDate]);
  return (
    <div className="orderDaily">
      <div className="orderDailyContainer">
        <div className="datePicker">
          <div className="startDate">
            <span>Start Date</span>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
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
            />
          </div>
        </div>
        <div className="charts">
          <Chart title="Daily" aspect={2 / 1} data={userStats} />
        </div>
      </div>
    </div>
  );
};

export default OrderDaily;
