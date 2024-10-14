"use client";
import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { RxCross1 } from "react-icons/rx";
import { Button } from "../ui/button";
interface LinkItem {
  name: string;
  href: string;
}

const SideBar = ({ setSidebar }: { setSidebar: (state: boolean) => void }) => {
  const { isSignedIn, user } = useUser();
  const Links: LinkItem[] = [
    {
      name: "Home",
      href: "/",
    },
    {
      name: "Rooms",
      href: `/my-rooms?id=${user?.id}`,
    },
    {
      name: "Pricing",
      href: "/pricing",
    },
  ];
  return (
    <div className="bg-[#080D27] h-[100vh] absolute  left-0 top-0 w-full z-20 md:hidden">
      <div className="py-4 px-2 text-2xl font-bold flex justify-between">
        LinkRoom
        <div onClick={() => setSidebar(false)}>
          <RxCross1 />
        </div>
      </div>
      <div className="flex mt-8  flex-col gap-5  items-center md:hidden  ">
        <div className="flex flex-col px-3 items-start justify-center  w-full gap-6  md:hidden ">
          {Links.map((item, index) => (
            <Link
              onClick={() => setSidebar(false)}
              key={index}
              className="text-2xl border-b-1  text-[#C2C9F3]  w-full  transition-all font-semibold ease-in-out duration-200 "
              href={item.href}
            >
              {item.name}
            </Link>
          ))}
        </div>
        <div className=" w-full ">
          {isSignedIn ? (
            <Button className="bg-transparent text-[#C2C9F3]   text-2xl font-semibold ">
              <UserButton />
            </Button>
          ) : (
            <Link href={"/sign-in"}>
              <Button className="bg-transparent text-[#C2C9F3]   text-2xl font-semibold ">
                Login
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default SideBar;
