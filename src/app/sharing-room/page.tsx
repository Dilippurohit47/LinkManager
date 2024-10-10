"use client";

import ShareableLinkComp from "@/components/my-components/shareableLinkCom";
import { useSearchParams } from "next/navigation";

import { useEffect, useState } from "react";
import { LinkType } from "../my-rooms/[...roomId]/page";
import { Button } from "@/components/ui/button";
const Page = () => {
  const searchParams = useSearchParams();
  const id = searchParams?.get("age");
  const clerkId = searchParams?.get("name");

  const [links, setLinks] = useState<LinkType[]>([]);
  const [linksLoaing, setLinksLoading] = useState<boolean>(true);

  useEffect(() => {
    setLinksLoading(true);
    const getLinks = async () => {
      const res = await fetch(`/api/link?roomId=${id}&clerkId=${clerkId}`, {
        method: "GET",
      });
      const data = await res.json();
      if (data && data.success) {
        setLinks(data.data);
      }
      setLinksLoading(false);
    };
    getLinks();
  }, [id, clerkId]);

  const clicks = async () => {
    const res = await fetch(`/api/clicks?id=${id}`, {
      method: "POST",
    });
  };
  return (
    <div className="min-h-screen  bg-[#080D27] py-20 px-1 sm:px-6 md:px-12">
      <Button className="cursor-pointer" onClick={clicks}>click</Button>
      <div>
        {linksLoaing ? (
          <div>
            {Array(3)
              .fill(0)
              .map((_, i) => (
                <div
                  key={i}
                  className="bg-zinc-100  rounded-lg h-20 animate-pulse  opacity-80 flex justify-between px-5 py-2 mt-8 items-center"
                ></div>
              ))}
          </div>
        ) : (
          <ShareableLinkComp links={links} />
        )}
      </div>
    </div>
  );
};

export default Page;
