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
import { useRouter } from "next/navigation";

import { useState } from "react";
import { toast } from "sonner";

const CreateRoomDialog = ({
  setIsDialogOpen,
  refreshRooms,
}: {
  setIsDialogOpen: (state: boolean) => void;
  refreshRooms: () => void;
}) => {
  const [roomName, setRoomName] = useState<string>("");
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
        body: JSON.stringify({ name: roomName, clerkId: user?.id }),
      });

      const data = await res.json();
      if (data) {
        if (data.success) {
          refreshRooms();
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

  return (
    <div>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Room</DialogTitle>
          <DialogDescription>
            You can add many links in your personal room
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
        <DialogFooter>
          <Button
            className="bg-blue-600 hover:bg-blue-500"
            type="submit"
            disabled={loading}
            onClick={createRoom}
          >
            {loading ? "creating..." : "Create"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </div>
  );
};

export default CreateRoomDialog;
