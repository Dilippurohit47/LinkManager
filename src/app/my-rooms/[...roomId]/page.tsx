"use client";
import CreateNewLinkDialog from "@/components/my-components/CreateNewLinkDialog";
import { AlertDialogDemo } from "@/components/my-components/DeleteRoomDialog";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { useUser } from "@clerk/nextjs";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaPencilAlt } from "react-icons/fa";
import { IoLink } from "react-icons/io5";
import { MdDeleteForever } from "react-icons/md";
import { SiGoogleanalytics } from "react-icons/si";
import { toast } from "sonner";

import Link from "next/link";
import { GrChapterAdd } from "react-icons/gr";
import useSWR, { mutate } from "swr";

export interface RoomType {
  id: string;
  clerkId: string;
  roomName: string;
  createdAt: string;
}

export interface LinkType {
  id: number;
  url: string;
  title: string;
  desc: string;
  roomId: number;
  room: RoomType;
}

const Page = () => {
  const Urlparams = useParams();
  const params = Urlparams?.roomId as string | undefined;
  const roomId = params?.[0];
  let  RoomName = params?.[1].split("%20").join(" ");
  const [roomName,setRoomName] = useState(RoomName)
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [links, setLinks] = useState<LinkType[]>([]);
  const { user } = useUser();
  const [editRoomName, setEditRoomName] = useState<boolean>(false);
  const [editRoomNameInput, setEditRoomNameInput] = useState<
    string | undefined
  >(RoomName);

  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data, isLoading } = useSWR(
    `/api/link?roomId=${roomId}&clerkId=${user?.id}`,
    fetcher
  );
  useEffect(() => {
    if (data) {
      setLinks(data.data);
    }
  }, [data]);

  const refreshLinks = () => {
    mutate(`/api/link?roomId=${roomId}&clerkId=${user?.id}`);
  };

  const [deleteRoomDialog, setDeleteRoomDialog] = useState<boolean>(false);

  const copyRoomLink = () => {
    navigator.clipboard.writeText(
      `${process.env.NEXT_PUBLIC_PRODUCTION_SHARING_URL}/sharing-room?age=${roomId}&name=${user?.id}`
    );
    toast.success("Link copied to clipboard");
  };

  const saveNewRoomName = async () => {
    try {
      const res = await fetch(`/api/room?roomId=${roomId} `, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: editRoomNameInput }),
      });
      if (res.ok) {
        setRoomName(editRoomNameInput)
        setEditRoomName(false);
        toast.success("Room name Changed", {
          duration: 1000,
          position: "top-right",
          richColors: true,
        });
      } else {
        toast.error("name field cannot be empty", {
          duration: 1000,
          position: "top-right",
          richColors: true,
        });
      }
    } catch (error) {
      toast.error("error in changing name try again later", {
        duration: 1000,
        position: "top-right",
        richColors: true,
      });
    }
  };

  return (
    <div className="min-h-screen  bg-[#080D27] py-20 px-1 sm:px-6 md:px-12">
      <div className=" mt-4 text-end flex gap-5 justify-end items-center flex-col sm:flex-row   ">
        <div className="flex w-full max-md:gap-2 gap-4  items-center  px-2 justify-between">
          <div className="w-full flex  items-center gap-3">
            {editRoomName ? (
              <input
                autoFocus
                className=" text-[#99A0CA]     border-b-2  border-b-white text-2xl focus:outline-none bg-[#080D27] max-md:hidden font-bold "
                value={editRoomNameInput}
                onChange={(e) => setEditRoomNameInput(e.target.value)}
              />
            ) : (
              <h1 className="text-[#99A0CA] capitalize max-md:hidden font-bold text-start text-2xl max-md:truncate">
                {roomName}
              </h1>
            )}
            {editRoomName ? (
              <Button
                className="bg-blue-500  hover:bg-blue-700 max-md:px-4 px-5 py-5"
                onClick={saveNewRoomName}
              >
                save
              </Button>
            ) : (
              <div
                className="text-white cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  setEditRoomName(!editRoomName);
                }}
              >
                <FaPencilAlt />
              </div>
            )}
          </div>
          <Link href={`/analytics?id=${roomId}`}>
            <Button className="bg-blue-500 hover:bg-blue-700 px-5 py-5">
              View Analytics
              <span className="ml-1 font-bold">
                <SiGoogleanalytics />
              </span>
            </Button>
          </Link>

          <div className="">
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild className="">
                <Button className="bg-blue-500 hover:bg-blue-700 px-5 py-5">
                  Add New Link
                  <span className="ml-1 font-bold">
                    <GrChapterAdd />
                  </span>
                </Button>
              </DialogTrigger>
              {roomId && (
                <CreateNewLinkDialog
                  roomId={roomId}
                  setIsDialogOpen={setIsDialogOpen}
                  refreshLinks={refreshLinks}
                />
              )}
            </Dialog>
          </div>
        </div>

        <div className=" flex gap-4  max-md:w-full max-md:justify-between max-md:px-2  px-4 ">
          <Button
            className="bg-blue-500  hover:bg-blue-700 max-md:px-4 px-5 py-5"
            onClick={copyRoomLink}
          >
            share this room
            <span className="ml-1 font-bold">
              <IoLink />
            </span>
          </Button>
          <Button
            variant="destructive"
            className="px-5 py-5"
            onClick={() => setDeleteRoomDialog(true)}
          >
            Delete Room
            <span className="ml-1 font-bold">
              <MdDeleteForever />
            </span>
          </Button>
        </div>
      </div>
      <AlertDialogDemo
        deleteRoomDialog={deleteRoomDialog}
        roomId={roomId!}
        setDeleteRoomDialog={(value: boolean) => setDeleteRoomDialog(value)}
      />
      <div>
        {isLoading ? (
          <div>
            {Array(3)
              .fill(0)
              .map((_, i) => (
                <div
                  key={i}
                  className="bg-zinc-100  rounded-lg h-20 animate-pulse  opacity-80 flex justify-between px-5 py-2 mt-8 items-center"
                ></div>
              ))}
          </div>
        ) : (
          "lol"
          <SingelLinkComponent links={links} refreshLinks={refreshLinks} />
        )}
      </div>
    </div>
  );
};

export default Page;
