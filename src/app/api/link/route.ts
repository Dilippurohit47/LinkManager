import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const POST = async (req: Request, res: Response) => {
  try {
    const { url, title, roomId } = await req.json();
    if (!url || !title || !roomId) {
      return NextResponse.json(
        { message: "Please Provide all fields" },
        { status: 400 }
      );
    }

    await prisma.link.create({
      data: {
        url: url,
        title: title,
        roomId: roomId,
      },
    });
    return NextResponse.json(
      { message: "Link created successfully " },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal server error " },
      { status: 500 }
    );
  }
};
