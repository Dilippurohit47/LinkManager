import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const { url, title, roomId, desc, clerkId } = await req.json();
    if (!url || !title || !roomId || !clerkId) {
      return NextResponse.json(
        { message: "Please Provide all fields", success: false },
        { status: 400 }
      );
    }

    const isValidURL = (url: string) => {
      try {
        new URL(url);
        return true;
      } catch (e) {
        return false;
      }
    };
    const isValid = isValidURL(url);

    if (!isValid) {
      return NextResponse.json(
        {
          message: "Please provide valid Url",
          success: false,
        },
        { status: 404 }
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
    const linkId = searchParams.get("linkId");

    if (linkId) {
      const link = await prisma.link.findFirst({
        where: {
          id: Number(linkId),
        },
      });

      return NextResponse.json(
        {
          data: {
            link: link,
            message: "Link find successfully",
            success: true,
          },
        },
        { status: 200 }
      );
    }

    if (!roomId || !clerkId) {
      return NextResponse.json(
        { message: "RoomId not avaialble" },
        { status: 400 }
      );
    }
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

export const DELETE = async (req: Request) => {
  try {
    const url = new URL(req.url);
    const searchParams = new URLSearchParams(url.searchParams);
    const linkId = searchParams.get("id");
    if (!linkId) {
      return NextResponse.json(
        {
          message: "LinkId is absent",
          success: false,
        },
        { status: 400 }
      );
    }

    await prisma.link.delete({
      where: {
        id: Number(linkId),
      },
    });

    return NextResponse.json(
      {
        message: "Link deleted successfully",
        success: true,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Internal server error",
        success: false,
      },
      { status: 500 }
    );
  }
};

export const PUT = async (req: Request) => {
  try {
    const { title, url, desc, linkId } = await req.json();
    if (!title || !url) {
      return NextResponse.json(
        { message: "These fields cannot be empty", success: false },
        { status: 404 }
      );
    }

    const isValidURL = (url: string) => {
      try {
        new URL(url);
        return true;
      } catch (e) {
        return false;
      }
    };
    const isValid = isValidURL(url);
    if (!isValid) {
      return NextResponse.json(
        {
          message: "Please provide valid Url",
          success: false,
        },
        { status: 404 }
      );
    }
    await prisma.link.update({
      where: {
        id: linkId,
      },
      data: {
        title: title,
        url: url,
        desc: desc,
      },
    });

    return NextResponse.json(
      { message: "Link updated successfully", success: true },
      { status: 200 }
    );
  } catch (error) {
    NextResponse.json(
      { message: "Internal server error", success: false },
      { status: 500 }
    );
  }
};
