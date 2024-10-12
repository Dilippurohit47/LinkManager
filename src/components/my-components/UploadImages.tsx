import React from "react";
import {
  CldUploadWidget,
  CloudinaryUploadWidgetInfo,
  CloudinaryUploadWidgetResults,
} from "next-cloudinary";
import { Button } from "../ui/button";
import { LuUpload } from "react-icons/lu";
interface UploadInfo {
  public_id: string;
}
const UploadImages = ({
  storePublicId,
}: {
  storePublicId: (publicId: string) => void;
}) => {
  return (
    <div className="z-[999]">
      <CldUploadWidget
        uploadPreset="linkroom"
        onSuccess={(results: CloudinaryUploadWidgetResults) => {
          const { event, info } = results;
          if (event === "success") {
            if (typeof info === "object" && info !== null) {
              storePublicId(info?.public_id);
            }
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
