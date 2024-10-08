import React from "react";
import { Button } from "../ui/button";

const SingelLinkComponent = () => {
  return (
    <div className="bg-white rounded-lg flex justify-between px-5 py-2 mt-8 items-center">
      <div>
        <div className="flex gap-10">
          <h1 className="font-bold">Camera Dslr 150</h1>
          <p className="text-red-500">20% sale on this product</p>
        </div>
        <a href="https:youtube.com" target="blank">
          <p className="text-blue-400">https:youtube.com</p>
        </a>
      </div>
      <div>
        <Button variant={"destructive"}>Delete</Button>
      </div>
    </div>
  );
};

export default SingelLinkComponent;
