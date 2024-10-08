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

export function AlertDialogDemo({
  deleteRoomDialog,
  setDeleteRoomDialog,
}: {
  deleteRoomDialog: boolean;
  setDeleteRoomDialog: (state: boolean) => void;
}) {
  const deleteRoom = () => {};

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
          <AlertDialogAction onClick={deleteRoom}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
