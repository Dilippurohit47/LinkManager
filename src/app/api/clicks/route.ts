import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
interface ClickData {
  city: string;
  click: number;
}
export const POST = async (req: NextRequest) => {
  try {
    const xForwardedFor = req.headers.get("x-forwarded-for");
    const ipAddress = xForwardedFor ? xForwardedFor.split(",")[0] : req.ip;
    const locationRes = await fetch(`http://ip-api.com/json/${ipAddress}`);
    const location = await locationRes.json();

    const url = new URL(req.url);
    const searchParams = new URLSearchParams(url.searchParams);
    const roomId = searchParams.get("id");
    const data = {
      city: location?.city || "Mumbai",
      click: 1,
    };

    if (roomId) {
      const find = await prisma.clicks.findFirst({
        where: {
          roomId: Number(roomId),
        },
      });

      if (find) {
        const existingClickData = Array.isArray(find.click)
          ? (find.click as unknown as ClickData[])
          : ([find.click] as unknown as ClickData[]);

        const updatedClickData = existingClickData.map((item) => {
          if (item && typeof item === "object" && item.city === data.city) {
            return { ...item, click: (item.click += 1) };
          }
          return item;
        });
        if (!existingClickData.some((item) => item?.city === data.city)) {
          updatedClickData.push(data);
        }
        console.log(updatedClickData);
        const update = await prisma.clicks.update({
          where: {
            id: Number(find.id),
          },
          // eslint-disable-next-line
          data: {
            // eslint-disable-next-line
            click: updatedClickData,
          },
        });

        return NextResponse.json(
          { message: "Clicks updated" },
          { status: 200 }
        );
      }
    }
    const res = await prisma.clicks.create({
      data: {
        click: [data],
        room: {
          connect: { id: Number(roomId) },
        },
      },
    });
    return NextResponse.json({ message: "New Click saved" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 500 });
  }
};

export const GET = async (req: Request) => {
  try {
    const searchParams = new URL(req.url);
    const params = new URLSearchParams(searchParams.searchParams);
    const id = params.get("id");

    if (!id) {
      return NextResponse.json({ error: "Wrong route" }, { status: 400 });
    }
    const clicks = await prisma.clicks.findFirst({
      where: {
        roomId: Number(id),
      },
    });
    return NextResponse.json(
      {
        data: {
      clicks,
          message: "Clicks fetch successfully",
        },
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
};