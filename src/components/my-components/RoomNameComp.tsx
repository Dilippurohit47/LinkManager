import React, { useState } from "react";
import { FaPencilAlt } from "react-icons/fa";
import { toast } from "sonner";
import { Button } from "../ui/button";

const RoomNameComp = ({
  RoomName,
  roomId,
}: {
  RoomName: string | undefined;
  roomId: string | undefined;
}) => {
  const [roomName, setRoomName] = useState<string | undefined>(RoomName);
  const [editRoomName, setEditRoomName] = useState<boolean>(false);
  const [editRoomNameInput, setEditRoomNameInput] = useState<
    string | undefined
  >(RoomName);

  const [saving, setSaving] = useState<boolean>(false);

  const saveNewRoomName = async () => {
    setSaving(true);
    try {
      const res = await fetch(`/api/room?roomId=${roomId} `, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: editRoomNameInput }),
      });
      if (res.ok) {
        setRoomName(editRoomNameInput);
        setEditRoomName(false);
        toast.success("Room name Changed", {
          duration: 1000,
          position: "top-right",
          richColors: true,
        });
      } else {
        toast.error("name field cannot be empty", {
          duration: 1000,
          position: "top-right",
          richColors: true,
        });
      }
    } catch (error) {
      toast.error("error in changing name try again later", {
        duration: 1000,
        position: "top-right",
        richColors: true,
      });
    }
    setSaving(false);
  };
  return (
    <div className="w-full flex  items-center gap-3">
      {editRoomName ? (
        <input
          autoFocus
          className=" text-[#99A0CA]     border-b-2  border-b-white text-2xl focus:outline-none bg-[#080D27] max-md:hidden font-bold "
          value={editRoomNameInput}
          onChange={(e) => setEditRoomNameInput(e.target.value)}
        />
      ) : (
        <h1 className="text-[#99A0CA] capitalize max-md:hidden font-bold text-start text-2xl max-md:truncate">
          {roomName}
        </h1>
      )}
      {editRoomName ? (
        <Button
        disabled={saving}
          className="bg-blue-500  hover:bg-blue-700 max-md:px-4 px-5 py-5"
          onClick={saveNewRoomName}
        >
      {
        saving ? "saving..." :     "    save"
      }
        </Button>
      ) : (
        <div
          className="text-white cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            setEditRoomName(!editRoomName);
          }}
        >
          <FaPencilAlt />
        </div>
      )}
    </div>
  );
};

export default RoomNameComp;
