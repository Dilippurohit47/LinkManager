import React from "react";
import { CldUploadWidget } from "next-cloudinary";
import { Button } from "../ui/button";
import { LuUpload } from "react-icons/lu";

const UploadImages = ({
  storePublicId,
}: {
  storePublicId:(publicId: string) => void;
}) => {
  return (
    <div className="z-[999]">
      <CldUploadWidget
        uploadPreset="linkroom"
        onSuccess={({ event, info }) => {
          if (event === "success") {
            storePublicId(info?.public_id);
          }
        }}
      >
        {({ open }) => {
          return (
            <Button
              className="bg-blue-600 hover:bg-blue-500"
              onClick={() => open()}
            >
              Ulpaod Image
              <span className="ml-2">
                <LuUpload size={20} />{" "}
              </span>
            </Button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};

export default UploadImages;
