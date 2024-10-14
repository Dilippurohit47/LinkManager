"use client";

import ChartComponents from "@/components/my-components/ChartComponents";
import DoughnutChart from "@/components/my-components/DoughnutChart";
import { useUser } from "@clerk/nextjs";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { RoomType } from "../my-rooms/[...roomId]/page";
import Link from "next/link";
import { SelectComponent } from "@/components/my-components/SelectComponent";
import useSWR from "swr";
import LoadingSpinner from "@/components/my-components/LoadingSpinner";

export interface ClickType {
  city: string;
  click: number;
}
export interface DeviceType {
  device: string;
  click: number;
}

const Page = () => {
  const { user } = useUser();
  const params = useSearchParams();
  const id = params?.get("id");
  const [clicks, setClicks] = useState<ClickType[]>([]);
  const [deviceClicks, setDeviceClicks] = useState<DeviceType[]>([]);
  const [totalClicks, setTotalClicks] = useState<number>(0);
  const [room, setRoom] = useState<RoomType[]>([]);
  const [activeRoom, setActiveRoom] = useState<string>("");

  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  const { data, isLoading: clickLoading } = useSWR(
    `api/clicks?id=${id}&userId=${user?.id}`,
    fetcher
  );

  useEffect(() => {
    if (data) {
      if (data?.data?.clicks?.click.length > 0) {
        setClicks(data.data.clicks?.click || 0);
      } else {
        setClicks([{ city: "", click: 0 }]);
      }
      if (data?.data?.clicks?.device?.length > 0) {
        setDeviceClicks(data.data.clicks?.device || 0);
      } else {
        setDeviceClicks([{ device: "", click: 0 }]);
      }
    }
  }, [data]);

  const { data: roomData, isLoading: roomLoading } = useSWR(
    `api/room?id=${user?.id}`,
    fetcher
  );

  useEffect(() => {
    if (roomData) {
      setRoom(roomData?.data);
    }
  }, [roomData]);

  useEffect(() => {
    if (clicks && clicks.length > 0) {
      let total = 0;
      for (let i = 0; i < clicks.length; i++) {
        total += clicks[i]?.click || 0;
      }
      setTotalClicks(total);
    }
  }, [clicks, activeRoom]);

  useEffect(() => {
    if (room && id) {
      const matchedRoom = room.find((item) => item.id == id);
      if (matchedRoom) {
        setActiveRoom(matchedRoom.roomName);
      }
    }
  }, [id, room]);
  return (
    <div className="min-h-screen  flex max-md:h-[120vh]  max-md:flex-col bg-[#080D27] py-20 px-1 sm:px-6 md:px-8 lg:px-12 ">
      <div className="h-[80vh] overflow-y-auto no-scrollbar max-ld:min-w-[25vw] bg-[#cecece] rounded-lg flex flex-col gap-3 px-2 py-2  max-md:hidden md:w-1/4">
        {room && room.length > 0 ? (
          room.map((item, i) => (
            <Link href={`/analytics?id=${item.id}`}>
              <div
                key={i}
                className={` ${
                  id && String(id) == item?.id
                    ? "bg-blue-700 text-white"
                    : "bg-[#ffffffcc]"
                } py-4 px-4  rounded-lg truncate cursor-pointer hover:bg-blue-500 transition-all ease-in-out duration-200`}
              >
                {item?.roomName}
              </div>
            </Link>
          ))
        ) : (
          <div className="font-bold">
            {roomLoading ? "loading.." : "No rooms available "}
          </div>
        )}
      </div>
      <div className="md:hidden flex justify-end px-2 mt-3 mb-3 items-center w-full text-white">
        <SelectComponent activeRoom={activeRoom} room={room} />
      </div>
      <div className="w-full  max-md:h-[50vh] h-[inherit]   ">
        <div className=" md:px-10 px-3 flex items-center h-[10%]">
          <h4 className="font-bold text-white">
            Total clicks: <span>{totalClicks}</span>
          </h4>
        </div>
        <div className="md:h-[50%] h-[80%] max-md:mt-4   ">
          {clickLoading ? (
            <div className="flex justify-center items-center  h-full">
              <LoadingSpinner />
            </div>
          ) : (
            <ChartComponents clicks={clicks} xAxis={"city"} line={"click"} />
          )}
        </div>
        <div>
          {clickLoading ? "" : <DoughnutChart deviceClicks={deviceClicks} />}
        </div>
      </div>
    </div>
  );
};

export default Page;
