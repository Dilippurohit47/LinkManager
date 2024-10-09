import React, { useState } from "react";
import { Button } from "../ui/button";
import { toast } from "sonner";

interface LinkType {
  id: number;
  roomId: number;
  title: string;
  url: string;
  desc: string;
}

const SingelLinkComponent = ({
  links,
  refreshLinks,
}: {
  links: LinkType[];
  refreshLinks: () => void;
  linksLoaing: boolean;
}) => {
  const [idDeleting, setIdDeleting] = useState<number | undefined>(undefined);
  const DeleteLink = async (id: number) => {
    setIdDeleting(id);
    try {
      const res = await fetch(`/api/link?id=${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data || data.success) {
        refreshLinks();
        toast.success(data.message);
        setIdDeleting(undefined);
      }
    } catch (error) {
      toast.error("Internal server error please try again");
    }
    setIdDeleting(undefined);
  };

  return (
    <>
      {links.length > 0 ? (
        links.map((link) => (
          <div
            key={link.id}
            className="bg-white rounded-lg flex justify-between px-5 py-2 mt-8 items-center"
          >
            <div>
              <div className="flex gap-10">
                <h1 className="font-bold capitalize">{link.title}</h1>
                <p className="text-red-500">{link.desc}</p>
              </div>
              <a href={link.url} target="blank">
                <p className="text-blue-400">{link.url}</p>
              </a>
            </div>
            <div>
              <Button
                disabled={idDeleting === link.id}
                variant={"destructive"}
                onClick={() => DeleteLink(link.id)}
              >
                {idDeleting === link.id ? "deleting" : "Delete"}
              </Button>
            </div>
          </div>
        ))
      ) : (
        <div className="text-white flex items-center justify-center">
          <h3>You dont have any Links</h3>
        </div>
      )}
    </>
  );
};

export default SingelLinkComponent;
