import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const POST = async (req: Request, res: Response) => {
  try {
    const { url, title, roomId, desc } = await req.json();
    if (!url || !title || !roomId) {
      return NextResponse.json(
        { message: "Please Provide all fields", success: false },
        { status: 400 }
      );
    }

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
    if (!roomId) {
      return NextResponse.json(
        { message: "RoomId not avaialble" },
        { status: 400 }
      );
    }

    const data = await prisma.link.findMany({
      where: {
        roomId: Number(roomId),
      },
    });

    return NextResponse.json(
      { success:true,
        message: "Links find successfully",
        data: data,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
};
