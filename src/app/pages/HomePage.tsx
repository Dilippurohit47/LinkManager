"use client";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";
import Link from "next/link";
import { useState } from "react";
import CreateRoomDialog from "../../components/my-components/CreateRoomDialog";

const HomePage = () => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const { user } = useUser();
  return (
    <div className="min-h-screen  min-w-[300px] w-full max-md:px-2  flex justify-center items-center flex-col gap-8 ">
      <div className="  h-[full] flex flex-col gap-4  text-center ">
        <h1 className="lg:text-5xl  md:text-4xl text-3xl text-white leading-tight  font-extrabold">
          Welcome to Link Room
        </h1>
        <h1 className="   text-3xl md:text-4xl lg:text-5xl leading-tight min-h-[8vh]   font-extrabold bg-gradient-to-r from-white to-purple-600 text-transparent bg-clip-text ">
          Manage and share all your links from one place
        </h1>
      </div>
      <div className="flex max-md:mt-5 justify-center  max-md:gap-4 max-md:ml-6 gap-6 ">
        {user && (
          <Link href={`/my-rooms?id=${user?.id}`}>
            <Button className="py-6 px-5 min-w-24  text-black bg-[#FBF8FE] hover:bg-[#FBF8FE]">
              My Rooms
            </Button>
          </Link>
        )}

        <Dialog
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          modal={false}
        >
          {user ? (
            <DialogTrigger asChild className="">
              <Button className="py-6 px-5 min-w-24 bg-[#A759EE] hover:bg-[#a546fd]">
                Create Room
              </Button>
            </DialogTrigger>
          ) : (
            <Link href={"/sign-up"}>
              <Button className="py-6 px-5 min-w-24 bg-[#A759EE] hover:bg-[#a546fd]">
                Create Room
              </Button>
            </Link>
          )}

          <CreateRoomDialog setIsDialogOpen={setIsDialogOpen} />
        </Dialog>
      </div>
    </div>
  );
};

export default HomePage;
