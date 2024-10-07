"use server ";
import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma"

export async function GET(request: Request, res: Response) {
  const user = await prisma.user.findMany();
  return NextResponse.json(user);
}



export async function POST(request: Request, res: Response) {
  const user = {
    email: "dili123",
    name: "dili123",
    age: "12",
  };

  await prisma.user.create({
    data: user,
  });
  console.log("user created successfully");
  return NextResponse.json(200);
}
