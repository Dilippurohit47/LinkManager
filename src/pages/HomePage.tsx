"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import CreateRoomDialog from "../components/my-components/CreateRoomDialog";
import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";

const HomePage = () => {
  const createUser = async () => {
    const data = await fetch("api/user", {
      method: "GET",
    });
    const res = await data.json();
    console.log(res);
  };

  return (
    <div className="h-screen w-full bg-zinc-200 flex justify-center items-center flex-col gap-8">
      <div className="  h-[10vh] text-center ">
        <h1 className="text-5xl leading-tight  font-extrabold bg-gradient-to-r from-pink-400 to-purple-600 text-transparent bg-clip-text">
          Manage all your links at one place
        </h1>
      </div>
      <div className="flex gap-6 ">
        <Button className="py-6 px-5 min-w-24" onClick={createUser}>
          My Room
        </Button>
        <Dialog>
          <DialogTrigger asChild className="">
            <Button className="py-6 px-5 min-w-24">Create Room</Button>
          </DialogTrigger>
          <CreateRoomDialog />
        </Dialog>
      </div>
    </div>
  );
};

export default HomePage;
