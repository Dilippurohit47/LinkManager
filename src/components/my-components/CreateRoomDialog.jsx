import { Button } from "@/components/ui/button";
import {
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const CreateRoomDialog = () => {
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
              value=""
              placeholder="ex: Yt Links"
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button className="bg-blue-600 hover:bg-blue-500" type="submit">
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </div>
  );
};

export default CreateRoomDialog;
