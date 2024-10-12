import { DeviceType } from "@/app/analytics/page";
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

const DoughnutChart = ({ deviceClicks }: { deviceClicks: DeviceType[] }) => {
  return (
    <div className=" h-[40vh]  w-[40vw] max-md:w-full  max-md:h-[50vh] max-md:-translate-x-5">
      <ResponsiveContainer className="h-full">
        <BarChart width={730} height={250} data={deviceClicks}>
          <CartesianGrid strokeDasharray="0 0" stroke="" />
          <XAxis dataKey="device" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="click" fill="#8884d8" barSize={30} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DoughnutChart;
