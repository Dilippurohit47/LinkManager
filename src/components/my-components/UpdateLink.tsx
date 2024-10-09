import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export function UpdateLinkDialog({
  edit,
  linkId,
  setEdit,
  refreshLinks,
}: {
  edit: boolean;
  linkId: number;
  setEdit: (state: boolean) => void;
  refreshLinks:()=>void;
}) {
  const [title, setTitle] = useState<string>("");
  const [url, setUrl] = useState<string>("");
  const [desc, setDesc] = useState<string>("");

  useEffect(() => {
    const getLink = async () => {
      const res = await fetch(`/api/link?linkId=${linkId}`);
      const data = await res.json();
      const link = data?.data?.link;
      if (data?.data?.success) {
        setTitle(link.title);
        setUrl(link.url);
        setDesc(link.desc);
      }
    };
    getLink();
  }, [edit, linkId]);
  const UpdateLink = async () => {
    try {
      const res = await fetch(`/api/link`, {
        method: "PUT",
        headers: {
          contentType: "application/json",
        },
        body: JSON.stringify({
          linkId: linkId,
          title: title,
          url: url,
          desc: desc,
        }),
      });
      const data = await res.json();

      if (data.success) {
        setEdit(false);
        toast.success("Link updated successfully");
        refreshLinks();
      }
    } catch (error) {
      toast.error("Internal server error");
    }
  };

  return (
    <Dialog open={edit}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Link</DialogTitle>
          <DialogDescription>
            Make changes to your Link here. Click save when you're done.
          </DialogDescription>
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
            className="bg-transparent text-black hover:bg-transparent"
            onClick={() => setEdit(false)}
          >
            Cancel
          </Button>

          <Button type="submit" onClick={UpdateLink}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
