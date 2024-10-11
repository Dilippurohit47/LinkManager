"use client";
import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import React, { useState } from "react";
import { GrMenu } from "react-icons/gr";
import SideBar from "./SideBar";
import clsx from "clsx";

const Header = () => {
  const { user } = useUser();
  const [sideBar, setSidebar] = useState<boolean>(false);

  return (
    <nav className="w-full text-white fixed  px-3 md:px-10 py-8 flex justify-between items-center">
      <Link href={"/"}>
        <div className="text-2xl  font-bold text-white">LinkRoom</div>
      </Link>

      <div>
        <div className="md:hidden" onClick={() => setSidebar(!sideBar)}>
          <GrMenu />
        </div>

        <div
          className={clsx(
            `absolute bg-red-500 w-full top-0  transition-all ease-in-out duration-300`,
            sideBar ? "right-0 " : "-right-[100%]"
          )}
        >
          <SideBar setSidebar={setSidebar} />
        </div>
      </div>
      <div className="md:flex gap-8  hidden">
        <Link href="/">Home</Link>
        <Link href={`/my-rooms?id=${user?.id}`}>Rooms</Link>
        <Link href={`/pricing`}>Pricing</Link>

        {user ? (
          <div>
            <UserButton />
          </div>
        ) : (
          <Link href="/sign-in">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Header;
