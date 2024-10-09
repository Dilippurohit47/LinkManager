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

  const { user } = useUser();
  return (
    <div className="h-screen w-full  flex justify-center items-center flex-col gap-8 bg-gradient-to-r   from-[#E0258C]  via-[#080D27]   to-[#080D27]">
      <div className="  h-[full]  text-center ">
        <h1 className="text-5xl text-white leading-tight  font-extrabold">
          Welcome to Link Room
        </h1>
        <h1 className="text-5xl leading-tight  font-extrabold bg-gradient-to-r from-white to-purple-600 text-transparent bg-clip-text">
          Manage all your links at one place
        </h1>
      </div>
      <div className="flex gap-6 ">
        <Button
          className="py-6 px-5 min-w-24  text-black bg-[#FBF8FE] hover:bg-[#FBF8FE]"
          onClick={() => router.push(`/my-rooms?id=${user?.id}`)}
        >
          My Room
        </Button>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          {user ? (
            <DialogTrigger asChild className="">
              <Button className="py-6 px-5 min-w-24 bg-[#A759EE] hover:bg-[#a546fd]">
                Create Room
              </Button>
            </DialogTrigger>
          ) : (
            <Button
              className="py-6 px-5 min-w-24 bg-[#A759EE] hover:bg-[#a546fd]"
              onClick={() => router.push("/sign-in")}
            >
             Create Room
            </Button>
          )}

          <CreateRoomDialog setIsDialogOpen={setIsDialogOpen} />
        </Dialog>
      </div>
    </div>
  );
};

export default HomePage;
