"use client";
import CreateNewLinkDialog from "@/components/my-components/CreateNewLinkDialog";
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

  const { user } = useUser();

  useEffect(() => {
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
        if (data.success) {
          console.log(data);
          setLinks(data.data);
        }
      };
      getLinks();
    }
  };

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
      </div>
      <div>
        <SingelLinkComponent links={links} refreshLinks={refreshLinks} />
      </div>
    </div>
  );
};

export default Page;
