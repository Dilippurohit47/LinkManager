"use client";
import CreateNewLinkDialog from "@/components/my-components/CreateNewLinkDialog";
import SingelLinkComponent from "@/components/my-components/SingelLinkComponent";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const Page = () => {
  const params = useParams();
  const roomId = params?.roomId as string | undefined;
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [links, setLinks] = useState([]);
  useEffect(() => {
    const getLinks = async () => {
      const res = await fetch(`/api/link?roomId=${roomId}`, {
        method: "GET",
      });
      const data = await res.json();
      if (data.success) {
        setLinks(data.data);
      }
    };

    getLinks();
  }, [roomId]);
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
            />
          )}
        </Dialog>

        <Button className="bg-blue-500 hover:bg-blue-700 px-5 py-5">
          share this room
        </Button>
      </div>
      <div>
        <SingelLinkComponent links={links} />
      </div>
    </div>
  );
};

export default Page;
