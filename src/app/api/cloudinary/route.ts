import { NextResponse } from "next/server";
import cloudinary from "cloudinary";
export const DELETE = async (req: Request) => {
  try {
    const { publicId } = await req.json();

    if (!publicId) {
      return NextResponse.json(
        { message: "There is no image or id" },
        { status: 200 }
      );
    }

    await cloudinary.v2.uploader.destroy(publicId);
    return NextResponse.json(
      { message: "Image deleted Successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({}, { status: 500 });
  }
};
