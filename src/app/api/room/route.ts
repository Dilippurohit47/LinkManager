import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const data = await prisma.room.findUnique({
      where: { id: 1 },
      include: {
        links: true,
      },
    });

    return NextResponse.json(
      { data: data, message: "room find successfully", success: false },
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

export const POST = async (req: Request, res: Response) => {
  try {
    const { name, userId } = await req.json();

    if (!name || !userId) {
      return NextResponse.json(
        { message: "Please provide all fields", success: false },
        { status: 400 }
      );
    }
    await prisma.room.create({
      data: {
        roomName: name,
        userId: userId,
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
