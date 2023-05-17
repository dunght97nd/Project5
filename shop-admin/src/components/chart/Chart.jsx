import "./chart.scss";
import {
  AreaChart,
  Area,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  YAxis,
} from "recharts";

// const data = [
//   { name: "Jan", Total: 1200 },
//   { name: "Feb", Total: 2100 },
//   { name: "Mar", Total: 800 },
//   { name: "Apr", Total: 1600 },
//   { name: "May", Total: 900 },
//   { name: "June", Total: 1700 },
//   { name: "July", Total: 1200 },
//   { name: "Aug", Total: 2100 },
//   { name: "Sep", Total: 800 },
//   { name: "Oct", Total: 1600 },
//   { name: "Nov", Total: 900 },
//   { name: "Dec", Total: 1700 },
// ];

const Chart = ({ aspect, title, data }) => {
  return (
    <div className="chart">
      <div className="heading">
        <div className="title">{title}</div>
        <span>Unit: VNĐ</span>
      </div>
      <ResponsiveContainer width="100%" aspect={aspect}>
        <AreaChart
          width={730}
          height={250}
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="_id" stroke="gray" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="total"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#total)"
            // unit="vnd"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
