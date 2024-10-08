import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const POST = async (req: Request, res: Response) => {
  try {
    const { url, title, roomId, desc, clerkId } = await req.json();
    if (!url || !title || !roomId || !clerkId) {
      return NextResponse.json(
        { message: "Please Provide all fields", success: false },
        { status: 400 }
      );
    }

    const ownerRoom = await prisma.room.findUnique({
      where: {
        id: Number(roomId),
        clerkId: clerkId,
      },
    });
    if (!ownerRoom) {
      return NextResponse.json(
        { message: "Oops You dont have any room", success: false },
        { status: 405 }
      );
    }
    console.log(ownerRoom);
    await prisma.link.create({
      data: {
        url: url,
        title: title,
        desc: desc,
        roomId: Number(roomId),
      },
    });
    return NextResponse.json(
      { message: "Link created successfully ", success: true },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal server error ", success: false },
      { status: 500 }
    );
  }
};

export const GET = async (req: Request) => {
  try {
    const url = new URL(req.url);
    const searchParams = new URLSearchParams(url.searchParams);

    const roomId = searchParams.get("roomId");
    const clerkId = searchParams.get("clerkId");

    if (!roomId || !clerkId) {
      return NextResponse.json(
        { message: "RoomId not avaialble" },
        { status: 400 }
      );
    }
    console.log(clerkId);
    const data = await prisma.link.findMany({
      where: {
        roomId: Number(roomId),
        room: {
          clerkId: clerkId,
        },
      },
    });
    return NextResponse.json(
      { success: true, message: "Links find successfully", data: data },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
};
