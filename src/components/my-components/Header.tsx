"use client";
import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";

const Header = () => {
  const { user } = useUser();

  return (
    <nav className="w-full text-white fixed px-10 py-8 flex justify-between items-center">
      <Link href={"/"}>
        <div className="text-2xl  font-bold text-white">LinkRoom</div>
      </Link>
      <div className="flex gap-8 ">
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
