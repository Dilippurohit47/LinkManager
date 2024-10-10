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
    <div className="h-screen w-full max-md:px-2  flex justify-center items-center flex-col gap-8 bg-gradient-to-r   from-[#E0258C]  via-[#080D27]   to-[#080D27]">
      <div className="  h-[full] flex flex-col gap-4  text-center ">
        <h1 className="lg:text-5xl  md:text-4xl text-3xl text-white leading-tight  font-extrabold">
          Welcome to Link Room
        </h1>
        <h1 className="   text-3xl md:text-4xl lg:text-5xl leading-tight min-h-[8vh]   font-extrabold bg-gradient-to-r from-white to-purple-600 text-transparent bg-clip-text ">
          Manage and share  all your links from one place
        </h1>
      </div>
      <div className="flex max-md:mt-5 justify-center  max-md:gap-4 max-md:ml-6 gap-6 ">
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
              onClick={() => router.push("/sign-up")}
            >
              Create Room
            </Button>
          )}

          <CreateRoomDialog  setIsDialogOpen={setIsDialogOpen} />
        </Dialog>
      </div>
    </div>
  );
};

export default HomePage;
