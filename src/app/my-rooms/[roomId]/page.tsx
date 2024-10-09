"use client";
import CreateNewLinkDialog from "@/components/my-components/CreateNewLinkDialog";
import { AlertDialogDemo } from "@/components/my-components/DeleteRoomDialog";
import SingelLinkComponent from "@/components/my-components/SingelLinkComponent";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { useUser } from "@clerk/nextjs";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface RoomType {
  id: number;
  clerkId: string;
  roomName: string;
  createdAt: string;
}

interface LinkType {
  id: number;
  url: string;
  title: string;
  desc: string;
  roomId: number;
  room: RoomType;
}

const Page = () => {
  const params = useParams();
  const roomId = params?.roomId as string | undefined;
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [links, setLinks] = useState<LinkType[]>([]);
  const [linksLoaing, setLinksLoading] = useState<boolean>(true);
  const [roomName, setRoomName] = useState<string>("");
  const { user } = useUser();

  useEffect(() => {
    setLinksLoading(true);
    if (user) {
      const getLinks = async () => {
        const res = await fetch(
          `/api/link?roomId=${roomId}&clerkId=${user.id}`,
          {
            method: "GET",
          }
        );
        const data = await res.json();
        if (data && data.success) {
          setRoomName(data.data[0].room.roomName);
          setLinks(data.data);
        }
        setLinksLoading(false);
      };
      getLinks();
    }
  }, [roomId, user]);
  const refreshLinks = () => {
    if (user) {
      const getLinks = async () => {
        const res = await fetch(
          `/api/link?roomId=${roomId}&clerkId=${user.id}`,
          {
            method: "GET",
          }
        );
        const data = await res.json();
        if (data && data.success) {
          setLinks(data.data);
        }
      };
      getLinks();
    }
  };

  const [deleteRoomDialog, setDeleteRoomDialog] = useState<boolean>(false);

  const copyRoomLink = () => {
    navigator.clipboard.writeText(
      `http://localhost:3000/sharing-room?age=${roomId}&name=${user?.id}`
    );
    toast.success("Link copied to clipboard");
  };

  return (
    <div className="h-screen  bg-[#080D27] py-20 px-12">
      <div className=" mt-4 text-end flex gap-5 justify-end items-center  ">
        <h1 className="text-[#99A0CA] font-bold text-start text-2xl w-full">
          {roomName}
        </h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild className="">
            <Button className="bg-blue-500 hover:bg-blue-700 px-5 py-5">
              Add New Link
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

        <Button
          className="bg-blue-500 hover:bg-blue-700 px-5 py-5"
          onClick={copyRoomLink}
        >
          share this room
        </Button>
        <Button
          variant="destructive"
          className="px-5 py-5"
          onClick={() => setDeleteRoomDialog(true)}
        >
          Delete Room
        </Button>
      </div>
      <AlertDialogDemo
        deleteRoomDialog={deleteRoomDialog}
        roomId={roomId!}
        setDeleteRoomDialog={(value: boolean) => setDeleteRoomDialog(value)}
      />
      <div>
        {linksLoaing ? (
          <div>
            {Array(3)
              .fill(0)
              .map((_,i) => (
                <div key={i} className="bg-zinc-100  rounded-lg h-20 animate-pulse  opacity-80 flex justify-between px-5 py-2 mt-8 items-center"></div>
              ))}
          </div>
        ) : (
          <SingelLinkComponent
            linksLoaing={linksLoaing}
            links={links}
            refreshLinks={refreshLinks}
          />
        )}
      </div>
    </div>
  );
};

export default Page;
