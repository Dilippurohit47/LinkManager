"use client";
import { Button } from "@/components/ui/button";
import React from "react";

const HomePage = () => {
  const handle = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/user`, {
        method: "GET",
      });

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const Create = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api`, {
        method: "POST",
      });

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-screen w-full bg-zinc-200 flex justify-center items-center flex-col gap-8">
      <div className="  h-[10vh] text-center ">
        <h1 className="text-5xl leading-tight  font-extrabold bg-gradient-to-r from-pink-400 to-purple-600 text-transparent bg-clip-text">
          Manage all your links at one place
        </h1>
      </div>
      <div className="flex gap-6 ">
        <Button className="py-6 px-5 min-w-24" onClick={handle}>
          My Room
        </Button>
        <Button className="py-6 px-5 min-w-24" onClick={Create}>
          Create Room
        </Button>
      </div>
    </div>
  );
};

export default HomePage;
