import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import cloudinary from "cloudinary";
export const GET = async (req: Request) => {
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
    console.log(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
};

export const POST = async (req: Request) => {
  try {
    const { name, clerkId, publicId } = await req.json();
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
        publicId: publicId,
      },
    });
    return NextResponse.json(
      { message: "Room created successfully", success: true },
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

export const DELETE = async (req: Request) => {
  try {
    const url = new URL(req.url);
    const searchParams = new URLSearchParams(url.searchParams);

    const roomId = searchParams.get("roomId");
    const clerkId = searchParams.get("clerkId");
    if (!roomId || !clerkId) {
      return NextResponse.json(
        { message: "Please Provide all fields", success: false },
        { status: 404 }
      );
    }

    const room = await prisma.room.findFirst({
      where: {
        id: Number(roomId),
      },
    });

    if (room?.publicId) {
      await cloudinary.v2.uploader.destroy(room.publicId);
    }

    await prisma.room.delete({
      where: {
        id: Number(roomId),
        clerkId: clerkId,
      },
    });
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
