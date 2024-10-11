import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
const ChartComponents = ({
  xAxis,
  line,
  clicks,
}: {
  xAxis: string;
  line: string;
  clicks: string[];
}) => {
  console.log(clicks)
  return (
    <ResponsiveContainer>
      <LineChart data={clicks}>
        <XAxis dataKey={xAxis} />
        <YAxis />
        <Tooltip labelStyle={{ color: "green" }} />
        <Legend />
        <Line type="monotone" dataKey={line} stroke="#82ca9d" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default ChartComponents;
