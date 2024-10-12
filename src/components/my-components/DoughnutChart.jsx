import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const DoughnutChart = () => {
  const data = [
    {
      name: "Desktop",
      clicks: "1700",
    },
    {
      name: "Mobile",
      clicks: "1209",
    },
    {
      name: "Tab",
      clicks: "1000",
    },
    {
      name: "Pc",
      clicks: "2000",
    },
  ];

  return (
    <div className=" h-[40vh]  w-[40vw] max-md:w-full  max-md:h-[50vh] max-md:-translate-x-5">
      <ResponsiveContainer className="h-full">
        <BarChart width={730} height={250} data={data}>
          <CartesianGrid strokeDasharray="0 0" stroke="" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="clicks" fill="#8884d8" barSize={30} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DoughnutChart;
