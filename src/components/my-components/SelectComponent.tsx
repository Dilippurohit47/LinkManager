import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RoomType } from "@/app/my-rooms/[...roomId]/page";
import Link from "next/link";

export function SelectComponent({ room ,activeRoom }: { room: RoomType[] ,activeRoom:string}) {
  return (
    <Select>
      <SelectTrigger className="w-[180px] bg-white text-black outline-none">
        <SelectValue placeholder={activeRoom} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Rooms</SelectLabel>
          {room &&
            room.length > 0 &&
            room.map((item, index) => (
              <Link key={index} href={`/analytics?id=${item.id}`}>
                <SelectItem value={item.roomName}>{item.roomName}</SelectItem>
              </Link>
            ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
