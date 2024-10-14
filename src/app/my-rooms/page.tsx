"use client";
import CreateRoomDialog from "@/components/my-components/CreateRoomDialog";
import ShowCloudinaryImage from "@/components/my-components/ShowCloudinaryImage";
import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";
import { PlusIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import useSWR, { mutate } from "swr";
import Yt from "../../../public/yt.jpg";

interface RoomType {
  id: number;
  clerkId: string;
  createdAt: string;
  roomName: string;
  publicId: string;
}

const Page = () => {
  const params = useSearchParams();
  const id = params?.get("id") || "";
  const [room, setRoom] = useState<RoomType[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  const { data, isLoading } = useSWR(`/api/room?id=${id}`, fetcher);

  useEffect(() => {
    if (data) {
      setRoom(data.data);
    }
  }, [data]);

  const refreshRooms = async () => {
    await mutate(`/api/room?id=${id}`);
  };

  return (
    <div className="max-md:h-full min-h-screen   bg-[#080D27] py-24 px-2  lg:px-12">
      {isLoading ? (
        <div className="grid lg:grid-cols-3 2xl:grid-cols-4 z-0  justify-items-center       px-2 mt-8 max-md:mt-5 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 w-full gap-5">
          {Array(3)
            .fill(0)
            .map((_, i) => (
              <div
                key={i}
                className=" bg-zinc-500  z-0   w-[290px] md:w-[38vw] sm:w-[45vw] lg:w-[28vw] 2xl:w-[20vw]  animate-pulse   h-60 rounded-lg"
              ></div>
            ))}
        </div>
      ) : (
        <div className="mt-8 max-md:mt-5 grid  grid-cols-1  h-full lg:grid-cols-3 2xl:grid-cols-4  place-items-center     sm:grid-cols-2 gap-6   ">
          {room && room.length > 0 ? (
            <>
              {room.map((item, index) => (
                <>
                  <Link href={`my-rooms/${item.id}/${item.roomName}`}>
                    <div
                      key={index}
                      className=" bg-zinc-100  w-[290px] md:w-[360px] sm:w-[45vw] lg:w-[28vw]  2xl:w-[20vw] px-4 flex flex-col shadow-md gap-2 cursor-pointer lg:hover:scale-105 transition-all ease-in-out duration-500 py-4 h-60 rounded-lg"
                    >
                      <div className=" w-full h-full  overflow-hidden">
                        {item.publicId ? (
                          <ShowCloudinaryImage publicId={item.publicId} />
                        ) : (
                          <Image
                            className="w-full rounded-lg h-[100%] object-fill"
                            width={1820}
                            height={1080}
                            src={Yt}
                            alt="image"
                          />
                        )}
                      </div>
                      <div className="flex justify-between  items-center">
                        <h1 className=" text-[1.2rem] truncate md:text-2xl   font-semibold ">
                          {item.roomName}
                        </h1>
                        <h2 className="">
                          {item.createdAt.split("").slice(0, 10)}
                        </h2>
                      </div>
                    </div>
                  </Link>
                </>
              ))}

              <div className="text-white w-[290px] md:w-[38vw] sm:w-[45vw] lg:w-[28vw] 2xl:w-[20vw]  flex  items-center justify-center">
                <Dialog
                  open={isDialogOpen}
                  onOpenChange={setIsDialogOpen}
                  modal={false}
                >
                  <DialogTrigger asChild>
                    <div className=" bg-zinc-200  w-full  cursor-pointer flex justify-center items-center  h-60 rounded-lg">
                      <div className=" bg-[#DBEAFE] h-[90%] flex justify-center items-center rounded-lg w-[90%]">
                        <div className=" bg-[#a7c1e3] rounded-full  text-white">
                          <PlusIcon fontSize="40px" className="h-16 w-16" />
                        </div>
                      </div>
                    </div>
                  </DialogTrigger>
                  <CreateRoomDialog
                    refresh={refreshRooms}
                    setIsDialogOpen={setIsDialogOpen}
                  />
                </Dialog>
              </div>
            </>
          ) : (
            <div className="text-white w-[290px] md:w-[38vw] sm:w-[45vw] lg:w-[28vw] 2xl:w-[20vw]    flex  items-center justify-center">
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <div className=" bg-zinc-200  w-full    cursor-pointer flex justify-center items-center  h-60 rounded-lg">
                    <div className=" bg-[#DBEAFE] h-[90%] flex justify-center items-center rounded-lg w-[90%]">
                      <div className=" bg-[#a7c1e3] rounded-full  text-white">
                        <PlusIcon fontSize="40px" className="h-16 w-16" />
                      </div>
                    </div>
                  </div>
                </DialogTrigger>
                <CreateRoomDialog
                  refresh={refreshRooms}
                  setIsDialogOpen={setIsDialogOpen}
                />
              </Dialog>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Page;
