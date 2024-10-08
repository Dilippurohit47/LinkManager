"use client";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import CreateRoomDialog from "../components/my-components/CreateRoomDialog";
import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

const HomePage = () => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const router = useRouter();
  const getRoom = async () => {
    const data = await fetch("api/room", {
      method: "GET",
    });
    const res = await data.json();
    console.log(res);
  };

  const createLink = async () => {
    const res = await fetch(`/api/link`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        url: "https//:youtube.com",
        roomId: 1,
        title: "youtube",
      }),
    });

    const data = await res.json();
    console.log(data);
  };
const {user} = useUser()
  return (
    <div className="h-screen w-full bg-zinc-200 flex justify-center items-center flex-col gap-8">
      <div className="  h-[10vh] text-center ">
        <h1 className="text-5xl leading-tight  font-extrabold bg-gradient-to-r from-pink-400 to-purple-600 text-transparent bg-clip-text">
          Manage all your links at one place
        </h1>
      </div>
      <div className="flex gap-6 ">
        <Button
          className="py-6 px-5 min-w-24"
          onClick={() => router.push(`/my-rooms?id=${user?.id}`)}
        >
          My Room
        </Button>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild className="">
            <Button className="py-6 px-5 min-w-24">Create Room</Button>
          </DialogTrigger>
          <CreateRoomDialog setIsDialogOpen={setIsDialogOpen} />
        </Dialog>
      </div>
    </div>
  );
};

export default HomePage;
