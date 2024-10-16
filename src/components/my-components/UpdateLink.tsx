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
import useSWR from "swr";
export function UpdateLinkDialog({
  edit,
  linkId,
  setEdit,
  refreshLinks,
}: {
  edit: boolean;
  linkId: number;
  setEdit: (state: boolean) => void;
  refreshLinks: () => void;
}) {
  const [title, setTitle] = useState<string>("");
  const [url, setUrl] = useState<string>("");
  const [desc, setDesc] = useState<string>("");

  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  const { data } = useSWR(`/api/link?linkId=${linkId}`, fetcher);
  useEffect(() => {
    const link = data?.data?.link;
    if (data?.data?.success) {
      setTitle(link.title);
      setUrl(link.url);
      setDesc(link.desc);
    }
  }, [data]);

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
      if (data && data.success) {
        setEdit(false);
        toast.success(data.message);
        refreshLinks();
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      toast.error("Internal server error");
    }
  };

  return (
    <Dialog  open={edit} onOpenChange={setEdit}> 
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Link</DialogTitle>
          <DialogDescription>
            Make changes to your Link here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Link Title
            </Label>
            <Input
              id="title"
              value={title}
              placeholder="Yt Links"
              className="col-span-3 "
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="url" className="text-right">
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
            <Label htmlFor="desc" className="text-right">
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
