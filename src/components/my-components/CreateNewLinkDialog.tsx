import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUser } from "@clerk/nextjs";

import { useState } from "react";
import { toast } from "sonner";

const CreateNewLinkDialog = ({
  setIsDialogOpen,
  roomId,
  refreshLinks,
}: {
  setIsDialogOpen: (state: boolean) => void;
  roomId: string;
  refreshLinks: () => void;
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [url, setUrl] = useState<string>("");
  const [desc, setDesc] = useState<string>("");
  const { user } = useUser();
  const createNewLink = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/link`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: url,
          title: title,
          desc: desc,
          roomId: roomId[0],
          clerkId: user?.id,
        }),
      });

      const data = await res.json();
      if (data.success) {
        toast.success(data.message);
        setIsDialogOpen(false);
        refreshLinks();
        setDesc("");
        setTitle("");
        setUrl("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Internal server error");
    }
    setLoading(false);
  };

  return (
    <div>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Link</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Link Title
            </Label>
            <Input
              id="title"
              value={title}
              placeholder="Yt Links"
              className="col-span-3"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Link
            </Label>
            <Input
            type="url"
              id="url"
              value={url}
              placeholder="https//:youtube.com"
              className="col-span-3"
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Desc
            </Label>
            <Input
              id="desc"
              value={desc}
              placeholder="20% off on this product"
              className="col-span-3"
              onChange={(e) => setDesc(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            className="bg-blue-600 hover:bg-blue-500"
            type="submit"
            onClick={createNewLink}
            disabled={loading}
          >
            {loading ? "creating..." : "Create"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </div>
  );
};

export default CreateNewLinkDialog;
