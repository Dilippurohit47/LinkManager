"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useEffect } from "react";
import Yt from "../../../public/yt.jpg";
const Page = () => {
  useEffect(() => {
    const getRooms = async () => {
      const data = await fetch("/api/room", {
        method: "GET",
      });
      const res = await data.json();
      console.log(res);
    };

    getRooms();
  }, []);

  return (
    <div className="h-screen  bg-zinc-200 py-16 px-12">
      <div className="mt-4 text-end  ">
        <Button className="bg-blue-500 hover:bg-blue-700 px-5 py-5">
          Share Room Link
        </Button>
      </div>

      <div className="mt-8 grid max-md:grid-cols-1 lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3   ">
        <div className="bg-white w-[20vw] px-4 flex flex-col shadow-md gap-2 cursor-pointer hover:scale-105 transition-all ease-in-out duration-500 py-4 h-60 rounded-lg">
          <div className=" w-full h-[80%]">
            <Image
              className="w-full rounded-lg h-[100%] object-fill "
              width={1820}
              height={1080}
              src={Yt}
              alt="image"
            />
          </div>
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold text-[#000000f6]">
              youtube links
            </h1>
            <h2>10-10-2024</h2>
          </div>
        </div>

        <div className="bg-white w-[20vw] px-4 flex flex-col shadow-md gap-2 cursor-pointer hover:scale-105 transition-all ease-in-out duration-500 py-4 h-60 rounded-lg">
          <div className=" w-full h-[80%]">
            <Image
              className="w-full rounded-lg h-[100%] object-fill "
              width={1820}
              height={1080}
              src={Yt}
              alt="image"
            />
          </div>
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold text-[#000000f6]">
              youtube links
            </h1>
            <h2>10-10-2024</h2>
          </div>
        </div>

        <div className="bg-white w-[20vw] px-4 flex flex-col shadow-md gap-2 cursor-pointer hover:scale-105 transition-all ease-in-out duration-500 py-4 h-60 rounded-lg">
          <div className=" w-full h-[80%]">
            <Image
              className="w-full rounded-lg h-[100%] object-fill "
              width={1820}
              height={1080}
              src={Yt}
              alt="image"
            />
          </div>
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold text-[#000000f6]">
              youtube links
            </h1>
            <h2>10-10-2024</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
