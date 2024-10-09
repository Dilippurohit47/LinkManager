"use client";
import CreateRoomDialog from "@/components/my-components/CreateRoomDialog";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";
import { PlusIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Yt from "../../../public/yt.jpg";

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
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  useEffect(() => {
    const getRooms = async () => {
      const data = await fetch(`/api/room?id=${id}`, {
        method: "GET",
      });
      const res = await data.json();
      setRoom(res.data);
      setRoomLoading(false);
    };
    if (id) {
      getRooms();
    }
  }, [id]);
  return (
    <div className="h-screen  bg-[#080D27] py-24 px-12">
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
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <div className=" bg-zinc-200 w-[20vw]  cursor-pointer flex justify-center items-center  h-60 rounded-lg">
                    <div className=" bg-[#DBEAFE] h-[90%] flex justify-center items-center rounded-lg w-[90%]">
                      <div className=" bg-[#a7c1e3] rounded-full  text-white">
                        <PlusIcon fontSize="40px" className="h-16 w-16" />
                      </div>
                    </div>
                  </div>
                </DialogTrigger>
                <CreateRoomDialog setIsDialogOpen={setIsDialogOpen} />
              </Dialog>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Page;
