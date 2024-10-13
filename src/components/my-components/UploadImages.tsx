import {
  CldUploadWidget,
  CloudinaryUploadWidgetResults
} from "next-cloudinary";
import { LuUpload } from "react-icons/lu";
import { Button } from "../ui/button";

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
