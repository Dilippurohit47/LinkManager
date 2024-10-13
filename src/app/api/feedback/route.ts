import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const { name, feedback } = await req.json();

    if (!name || !feedback) {
      return NextResponse.json(
        { message: "Please enter all fields", success: false },
        { status: 404 }
      );
    }

    await prisma.feedback.create({
      data: {
        name: name,
        feedback: feedback,
      },
    });
    return NextResponse.json(
      { message: "Feedback sent successfully", success: true },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error try again later", success: false },
      { status: 500 }
    );
  }
};
