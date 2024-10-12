import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import { toast } from "sonner";
import ShowCloudinaryImage from "./ShowCloudinaryImage";
import UploadImages from "./UploadImages";
const CreateRoomDialog = ({
  setIsDialogOpen,
  refreshRooms,
}: {
  setIsDialogOpen: (state: boolean) => void;
  refreshRooms?: () => void;
}) => {
  const [roomName, setRoomName] = useState<string>("");
  const [publicId, setpublicId] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { user } = useUser();
  const createRoom = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/room`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ name: roomName, clerkId: user?.id,publicId:publicId }),
      });

      const data = await res.json();
      if (data) {
        if (data.success) {
          if (refreshRooms) {
            refreshRooms();
          }
          toast.success(data.message);
          setIsDialogOpen(false);
          setRoomName("");
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error("Internal server try again");
    }
    setLoading(false);
  };

  const storePublicId = (publicId: string) => {
    setpublicId(publicId);
  };
  const removePublicId = async (publicId: string) => {
    setpublicId("");
    await fetch("/api/cloudinary", {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        publicId: publicId,
      }),
    });
  };
  return (
    <div>
      <DialogContent
        className="sm:max-w-[425px] "
        onInteractOutside={(event) => event.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Create New Room</DialogTitle>
          <DialogDescription>
            You can add many links in your personal room
            <br />
            <span className="text-blue-400">Image is optional.</span>
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Room Name
            </Label>
            <Input
              id="name"
              value={roomName}
              placeholder="ex: Yt Links"
              className="col-span-3"
              onChange={(e) => setRoomName(e.target.value)}
            />
          </div>
        </div>
        <ShowCloudinaryImage
          publicId={publicId}
          removePublicId={removePublicId}
        />
        <DialogFooter>
          <div className="w-full flex max-md:flex-col max-md:gap-4  md:justify-between">
            <div>
              <UploadImages storePublicId={storePublicId} />
            </div>
            <div className="flex gap-3 w-full justify-end max-md:items-center ">
              <Button
                className="bg-transparent hover:bg-transparent text-black max-md:w-full"
                onClick={() => setIsDialogOpen(false)}
              >
                cancel
              </Button>
              <Button
                className="bg-blue-600 hover:bg-blue-500 max-md:w-full"
                type="submit"
                disabled={loading}
                onClick={createRoom}
              >
                {loading ? "creating..." : "Create"}
              </Button>
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </div>
  );
};

export default CreateRoomDialog;
