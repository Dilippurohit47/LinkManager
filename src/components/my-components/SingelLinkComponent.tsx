import React from "react";
import { Button } from "../ui/button";

interface LinkType {
  id: number;
  roomId: number;
  title: string;
  url: string;
  desc: string;
}

const SingelLinkComponent = ({ links }: { links: LinkType[] }) => {
  console.log(links);
  return (
    <>
      {links.length > 0 ?  links.map((link) => (
        <div key={link.id} className="bg-white rounded-lg flex justify-between px-5 py-2 mt-8 items-center">
          <div>
            <div className="flex gap-10">
              <h1 className="font-bold capitalize">{link.title}</h1>
              <p className="text-red-500">{link.desc}</p>
            </div>
            <a href="https:youtube.com" target="blank">
              <p className="text-blue-400">{link.url}</p>
            </a>
          </div>
          <div>
            <Button variant={"destructive"}>Delete</Button>
          </div>
        </div>
      )) : "No links available to sho"}
    </>
  );
};

export default SingelLinkComponent;
