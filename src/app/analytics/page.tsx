"use client";

import ChartComponents from "@/components/my-components/ChartComponents";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const Page = () => {
  const params = useSearchParams();
  const id = params?.get("id");
  const [clicks, setClicks] = useState([]);

  useEffect(() => {
    const getClicks = async () => {
      const res = await fetch(`api/clicks?id=${id}`, {
        method: "GET",
      });
      const data = await res.json();
      // console.log(data)
      setClicks(data?.data?.clicks?.click);
    };
    getClicks();
  }, []);
  console.log(clicks);
  return (
    <div className="min-h-screen  bg-[#080D27] py-20 px-1 sm:px-6 md:px-12 flex">
      <div className="h-[inherit] bg-red-500 w-1/4">d</div>

      <div className="w-full h-[inherit]  ">
        <div className="h-[50%]">
          <ChartComponents clicks={clicks} xAxis={"city"} line={"click"} />
        </div>
      </div>
    </div>
  );
};

export default Page;
