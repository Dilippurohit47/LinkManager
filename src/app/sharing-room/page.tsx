"use client";

import ShareableLinkComp from "@/components/my-components/shareableLinkCom";
import SingelLinkComponent from "@/components/my-components/SingelLinkComponent";
import { useSearchParams } from "next/navigation";

import { useEffect, useState } from "react";
const Page = () => {
  const searchParams = useSearchParams();
  const id = searchParams?.get("age");
  const clerkId = searchParams?.get("name");

  const [links, setLinks] = useState([]);
  const [linksLoaing, setLinksLoading] = useState<boolean>(true);
  const user = "user";
  useEffect(() => {
    setLinksLoading(true);
    if (user) {
      const getLinks = async () => {
        const res = await fetch(`/api/link?roomId=${id}&clerkId=${clerkId}`, {
          method: "GET",
        });
        const data = await res.json();
        if (data.success) {
          setLinks(data.data);
        }
        setLinksLoading(false);
      };
      getLinks();
    }
  }, [id, user]);
  console.log(linksLoaing);
  const refreshLinks = () => {
    if (user) {
      const getLinks = async () => {
        const res = await fetch(`/api/link?roomId=${id}&clerkId=${clerkId}`, {
          method: "GET",
        });
        const data = await res.json();
        if (data.success) {
          console.log(data);
          setLinks(data.data);
        }
      };
      getLinks();
    }
  };

  return (
    <div className="h-screen  bg-[#080D27] py-20 px-12">
      <div>
        {linksLoaing ? (
          <div>
            {Array(3)
              .fill(0)
              .map(() => (
                <div className="bg-zinc-100  rounded-lg h-20 animate-pulse  opacity-80 flex justify-between px-5 py-2 mt-8 items-center"></div>
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
