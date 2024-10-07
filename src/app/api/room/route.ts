import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const POST = async (req: Request, res: Response) => {
  try {
    const { name, userId } = await req.json();

    if (!name || !userId) {
      return NextResponse.json({ message: "Please provide name and userId" });
    }
    await prisma.room.create({
      data: {
        roomName: name,
        userId: userId,
      },
    });
    return NextResponse.json(
      { message: "Room created successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 200 }
    );
  }
};
