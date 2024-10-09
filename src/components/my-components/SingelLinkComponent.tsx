import React, { useState } from "react";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { UpdateLinkDialog } from "./UpdateLink";

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
  const [idDeleting, setIdDeleting] = useState<number>();
  const DeleteLink = async (id: number) => {
    setIdDeleting(id);
    try {
      const res = await fetch(`/api/link?id=${id}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (data && data.success) {
        refreshLinks();
        toast.success(data.message);
      } else {
        toast.error(data?.message || "Failed to delete the link");
      }
    } catch (error) {
      toast.error("Internal server error, please try again");
    } finally {
      setIdDeleting(undefined);
    }
  };

  const [edit, setEdit] = useState<boolean>(false);
  const [editId, setEditId] = useState<number | undefined>(undefined);
  return (
    <>
      {links && links.length > 0 ? (
        links.map((link) => (
          <div
            key={link.id}
            className="bg-white rounded-lg flex justify-between px-2 md:px-5 py-2 mt-8 items-center"
          >
            <div className=" max-md:w-[70vw]">
              <div className="flex md:gap-10 flex-col md:flex-row">
                <h1 className="font-bold capitalize overflow-hidden overflow-ellipsis">{link.title}</h1>
                <p className="text-red-500   overflow-hidden overflow-ellipsis">{link.desc}</p>
              </div>
              <a href={link.url} target="blank">
                <p className="text-blue-400 truncate">{link.url}</p>
              </a>
            </div>
            <div className="flex gap-1  lg:gap-5 flex-col lg:flex-row">
              <Button
                onClick={() => {
                  setEdit(true);
                  setEditId(link.id);
                }}
              >
                Edit
              </Button>
              <UpdateLinkDialog
                refreshLinks={refreshLinks}
                linkId={Number(editId)}
                edit={edit}
                setEdit={setEdit}
              />
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
        <div className="text-white flex mt-6 items-center justify-center">
          <h3>This room dont have any Links</h3>
        </div>
      )}
    </>
  );
};

export default SingelLinkComponent;
