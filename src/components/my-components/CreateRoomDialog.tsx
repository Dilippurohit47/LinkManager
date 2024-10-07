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
import { useState } from "react";

const CreateRoomDialog = () => {
  const [roomName, setRoomName] = useState<string>("");

  const createRoom = async () => {
    const res = await fetch(`/api/room`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ name: roomName, userId: 5 }),
    });

    const data = await res.json()
    console.log(data);
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
            onClick={createRoom}
          >
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </div>
  );
};

export default CreateRoomDialog;
