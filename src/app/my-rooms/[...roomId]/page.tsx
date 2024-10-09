"use client";
import CreateNewLinkDialog from "@/components/my-components/CreateNewLinkDialog";
import { AlertDialogDemo } from "@/components/my-components/DeleteRoomDialog";
import SingelLinkComponent from "@/components/my-components/SingelLinkComponent";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { useUser } from "@clerk/nextjs";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const Page = () => {
  const params = useParams();
  const roomId = params?.roomId as string | undefined;
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [links, setLinks] = useState([]);
  const [linksLoaing, setLinksLoading] = useState<boolean>(true);
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
        if (data.success) {
          setLinks(data.data);
        }
        setLinksLoading(false);
      };
      getLinks();
    }
  }, [roomId, user]);
  console.log(linksLoaing);
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
        if (data.success) {
          console.log(data);
          setLinks(data.data);
        }
      };
      getLinks();
    }
  };

  const [deleteRoomDialog, setDeleteRoomDialog] = useState<boolean>(false);

  return (
    <div className="h-screen  bg-[#080D27] py-20 px-12">
      <div className=" mt-4 text-end flex gap-5 justify-end items-center  ">
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

        <Button className="bg-blue-500 hover:bg-blue-700 px-5 py-5">
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
            <div className="bg-zinc-100  rounded-lg h-20 animate-pulse  opacity-80 flex justify-between px-5 py-2 mt-8 items-center"></div>
            <div className="bg-zinc-100  rounded-lg h-20 animate-pulse  opacity-80 flex justify-between px-5 py-2 mt-8 items-center"></div>
            <div className="bg-zinc-100  rounded-lg h-20 animate-pulse  opacity-80 flex justify-between px-5 py-2 mt-8 items-center"></div>
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
