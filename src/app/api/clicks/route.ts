import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
interface ClickData {
  city: string;
  click: number;
}
export const POST = async (req: Request) => {
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
          data: {
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
        click: data,
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
