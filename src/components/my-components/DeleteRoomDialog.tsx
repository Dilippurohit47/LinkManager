import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export function AlertDialogDemo({
  deleteRoomDialog,
  setDeleteRoomDialog,
  roomId,
}: {
  deleteRoomDialog: boolean;
  setDeleteRoomDialog: (state: boolean) => void;
  roomId: string;
}) {
  const { user } = useUser();
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const deleteRoom = async () => {
    setLoading(true);
    try {
      if (user) {
        const res = await fetch(
          `/api/room?roomId=${roomId}&clerkId=${user.id}`,
          {
            method: "DELETE",
          }
        );

        const data = await res.json();
        if (data.success) {
          setDeleteRoomDialog(false);
          toast.success(data.message);
          router.push(`/my-rooms?id=${user.id}`);
        } else {
          toast.error(data.message);
          setLoading(false);
        }
      }
    } catch (error) {
      toast.error("Internal server error try again later");
    }
    setLoading(false);
  };

  return (
    <AlertDialog open={deleteRoomDialog}>
      <AlertDialogTrigger asChild></AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your room
            and all your links related to this room.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setDeleteRoomDialog(false)}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction disabled={loading} onClick={deleteRoom}>
            {loading ? "deleting..." : "Continue"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
