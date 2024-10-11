import { prisma } from "@/lib/prisma";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

export const GET = async (req: NextApiRequest) => {
  try {
    const url = new URL(req.url!);
    const searchParams = new URLSearchParams(url.searchParams);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json(
        { message: "Cannot get room ", success: false },
        { status: 400 }
      );
    }
    const data = await prisma.room.findMany({
      where: { clerkId: id },
      include: {
        links: true,
      },
    });

    return NextResponse.json(
      { data: data, message: "Room find successfully", success: true },
      { status: 200 }
    );
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
};

export const POST = async (req: Request) => {
  try {
    const { name, clerkId } = await req.json();
    if (!name || !clerkId) {
      return NextResponse.json(
        { message: "Please provide all fields", success: false },
        { status: 400 }
      );
    }
    await prisma.room.create({
      data: {
        roomName: name,
        clerkId: clerkId,
      },
    });
    return NextResponse.json(
      { message: "Room created successfully", success: true },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
};

export const DELETE = async (req: Request) => {
  try {
    const url = new URL(req.url);
    const searchParams = new URLSearchParams(url.searchParams);

    const roomId = searchParams.get("roomId");
    const clerkId = searchParams.get("clerkId");
    console.log(roomId, clerkId);
    if (!roomId || !clerkId) {
      return NextResponse.json(
        { message: "Please Provide all fields", success: false },
        { status: 404 }
      );
    }

    const data = await prisma.room.delete({
      where: {
        id: Number(roomId),
        clerkId: clerkId,
      },
    });
    console.log(data);
    return NextResponse.json(
      { message: "Room Deleted SuccessFully", success: true },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal server error", success: false },
      { status: 500 }
    );
  }
};
