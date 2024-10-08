import { prisma } from "@/lib/prisma";
import { request } from "http";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

export const GET = async (req: NextApiRequest) => {
  try {
    const url = new URL(req.url!);
    const searchParams = new URLSearchParams(url.searchParams);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json(
        { message: "Please provide id", success: false },
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
      { data: data, message: "room find successfully", success: true },
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
    const { name, clerkId } = await req.json();
    console.log(name, clerkId);
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
    console.log(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
};
