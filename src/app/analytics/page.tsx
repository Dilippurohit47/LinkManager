"use client";

import ChartComponents from "@/components/my-components/ChartComponents";
import { useUser } from "@clerk/nextjs";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { RoomType } from "../my-rooms/[...roomId]/page";
import Link from "next/link";

export interface ClickType {
  city: string;
  click: number;
}

const Page = () => {
  const { user } = useUser();
  const params = useSearchParams();
  const id = params?.get("id");
  const [clicks, setClicks] = useState<ClickType[]>([]);
  const [totalClicks, setTotalClicks] = useState<number>(0);
  const [room, setRoom] = useState<RoomType[]>([]);
  useEffect(() => {
    const getClicks = async () => {
      const res = await fetch(`api/clicks?id=${id}`, {
        method: "GET",
      });
      const data = await res.json();
      setClicks(data?.data?.clicks?.click);
    };

    getClicks();
  }, [id]);
  useEffect(() => {
    if (clicks && clicks.length > 0) {
      let total = 0;
      for (let i = 0; i < clicks.length; i++) {
        total += clicks[i]?.click || 0;
      }
      setTotalClicks(total);
    }
  }, [clicks]);

  useEffect(() => {
    const getRooms = async () => {
      const res = await fetch(`api/room?id=${user?.id}`, {
        method: "GET",
      });

      const data = await res.json();
      setRoom(data?.data);
    };
    if (user) {
      getRooms();
    }
  }, [user]);

  console.log(room);
  return (
    <div className="min-h-screen max-md:min-w-[320px] flex  max-md:flex-col bg-[#080D27] py-20 px-1 sm:px-6 md:px-12 ">
      <div className="h-[80vh] bg-[#cecece] rounded-lg flex flex-col gap-3 px-2 py-2  max-md:hidden md:w-1/4">
        {room && room.length > 0
          ? room.map((item, i) => (
              <Link href={`/analytics?id=${item.id}`}>
                <div
                  key={i}
                  className={` ${id &&  String(id) == item?.id ? "bg-blue-700" : "bg-[#ffffffcc]"} py-4 px-4  rounded-lg cursor-pointer hover:bg-blue-500 transition-all ease-in-out duration-200`}
                >
                  {item?.roomName}
                </div>
              </Link>
            ))
          : "no rooms"}
      </div>

      <div className="w-full  max-md:h-[50vh] h-[inherit]  ">
        <div className=" md:px-10 px-3 flex items-center h-[10%]">
          <h4 className="font-bold text-white">
            Total clicks: <span>{totalClicks}</span>
          </h4>
        </div>
        <div className="md:h-[50%] h-[70%] max-md:mt-4  ">
          <ChartComponents clicks={clicks} xAxis={"city"} line={"click"} />
        </div>
      </div>
    </div>
  );
};

export default Page;