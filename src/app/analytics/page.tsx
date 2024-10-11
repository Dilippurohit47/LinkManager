"use client";

import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Register necessary components

const Page = () => {
  const data = [
    { city: "City A", clicks: 120 },
    { city: "City B", clicks: 200 },
    { city: "City C", clicks: 150 },
    { city: "City D", clicks: 300 },
    { city: "City E", clicks: 100 },
    { city: "City E", clicks: 100 },
    { city: "City E", clicks: 100 },
    { city: "City E", clicks: 100 },
    { city: "City E", clicks: 100 },
    { city: "City E", clicks: 100 },
    { city: "City E", clicks: 100 },
    { city: "City E", clicks: 100 },
    { city: "City E", clicks: 100 },
  ];

  const [clicks, setClicks] = useState([]);

  useEffect(() => {
    const getClicks = async () => {
      const res = await fetch(`api/clicks?id=${33}`, {
        method: "GET",
      });
      const data = await res.json();
      setClicks(data?.data.clicks.click);
      console.log(data?.data.clicks.click);

      console.log(data?.data.clicks.click);
    };
    getClicks();
  }, []);

  return (
    <div className="min-h-screen  bg-[#080D27] py-20 px-1 sm:px-6 md:px-12 flex">
      <div className="h-[inherit] bg-red-500 w-1/4">d</div>

      <div className="w-full h-[inherit]  ">
        <div className="h-[50%]">
          <ResponsiveContainer>
            <LineChart data={clicks}>
              <XAxis dataKey="city" />
              <YAxis />
              <Tooltip labelStyle={{ color: "green" }} />
              <Legend />
              <Line type="monotone" dataKey="click" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Page;
