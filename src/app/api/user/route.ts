"use server ";
import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

interface Data {
  email: string;
  name: string;
  clerkId: string;
}

export async function GET(request: Request, res: Response) {
  const user = await prisma.user.findMany();
  return NextResponse.json(user);
}

export async function POST(request: Request, res: Response) {
  const user: Data = {
    email: "dili123",
    name: "dili123",
    clerkId: "12345_g",
  };

  await prisma.user.create({
    data: user,
  });
  console.log("user created successfully");
  return NextResponse.json(200);
}
