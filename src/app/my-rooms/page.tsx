"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Yt from "../../../public/yt.jpg";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface RoomType {
  id: number;
  clerkId: string;
  createdAt: string;
  roomName: string;
}

const Page = () => {
  const params = useSearchParams();
  const id = params?.get("id");

  const [room, setRoom] = useState<RoomType[]>([]);
  const [roomLoading, setRoomLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const getRooms = async () => {
      const data = await fetch(`/api/room?id=${id}`, {
        method: "GET",
      });
      console.log(data);
      const res = await data.json();
      setRoom(res.data);
      setRoomLoading(false);
    };
    if (id) {
      getRooms();
    }
  }, [id]);

  return (
    <div className="h-screen  bg-[#080D27] py-16 px-12">
      <div className="mt-4 text-end  ">
        <Button className="bg-blue-500 hover:bg-blue-700 px-5 py-5">
          Share Full Room Link
        </Button>
      </div>

      {roomLoading ? (
        <div className="flex gap-5">
          {Array(3)
            .fill(0)
            .map(() => (
              <div className=" bg-zinc-100 w-[20vw] animate-pulse   h-60 rounded-lg"></div>
            ))}
        </div>
      ) : (
        <div className="mt-8 grid max-md:grid-cols-1 lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3   ">
          {room?.length > 0 ? (
            room.map((item, index) => (
              <div
                key={index}
                className=" bg-zinc-100 w-[20vw] px-4 flex flex-col shadow-md gap-2 cursor-pointer hover:scale-105 transition-all ease-in-out duration-500 py-4 h-60 rounded-lg"
                onClick={() => router.push(`my-rooms/${item.id}`)}
              >
                <div className=" w-full h-[85%]">
                  <Image
                    className="w-full rounded-lg h-[100%] object-fill "
                    width={1820}
                    height={1080}
                    src={Yt}
                    alt="image"
                  />
                </div>
                <div className="flex justify-between  items-center">
                  <h1 className="text-2xl  font-semibold ">{item.roomName}</h1>
                  <h2 className="">{item.createdAt.split("").slice(0, 10)}</h2>
                </div>
              </div>
            ))
          ) : (
            <div className="text-white flex items-center justify-center">
              <h3>
                You dont have any active room
                <Link
                  className=" ml-1 text-blue-400 underline"
                  href="/"
                  passHref
                >
                  create one
                </Link>
              </h3>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Page;
